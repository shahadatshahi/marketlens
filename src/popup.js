// Side-panel header controls
document.getElementById('minimizeBtn').addEventListener('click', () => {
  document.body.classList.toggle('minimized');
});
document.getElementById('closeBtn').addEventListener('click', () => {
  window.close();
});

document.getElementById('analyseBtn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    const signal = document.getElementById('signal');
    const confidence = document.getElementById('confidence');
    const reasoning = document.getElementById('reasoning');
  
    status.textContent = 'Capturing chart...';
    signal.textContent = '--';
    confidence.textContent = 'Confidence: --';
    reasoning.textContent = 'Analysing...';
  
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      // Check if we're on TradingView
      if (!tab.url.includes('tradingview.com')) {
        status.textContent = 'Please open a TradingView chart first.';
        reasoning.textContent = 'Navigate to TradingView and open a chart, then click Analyse Chart.';
        return;
      }
  
      status.textContent = 'Taking screenshot...';
  
      // Capture screenshot of the current tab
      const screenshotUrl = await chrome.tabs.captureVisibleTab(null, {
        format: 'png'
      });
  
      status.textContent = 'Sending to AI...';
  
      // Send to background script for AI analysis
      const response = await chrome.runtime.sendMessage({
        action: 'analyseChart',
        screenshot: screenshotUrl
      });
  
      if (response.error) {
        status.textContent = 'Error: ' + response.error;
        reasoning.textContent = response.error;
        return;
      }
  
      // Display results
      signal.textContent = response.signal;
      signal.className = 'signal-value ' + response.signal;
      confidence.textContent = 'Confidence: ' + Math.round(response.confidence * 100) + '%';
      reasoning.textContent = response.reasoning;
      status.textContent = 'Analysis complete ✓';
  
    } catch (err) {
      status.textContent = 'Something went wrong.';
      reasoning.textContent = err.message;
    }
  });