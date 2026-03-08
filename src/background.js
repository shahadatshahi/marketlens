chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'analyseChart') {
      analyseChart(message.screenshot)
        .then(result => sendResponse(result))
        .catch(err => sendResponse({ error: err.message }));
      return true; // Keep message channel open for async response
    }
  });
  
  async function analyseChart(screenshotUrl) {
    // Convert screenshot URL to base64
    const base64Image = screenshotUrl.split(',')[1];
  
    const prompt = `You are an expert forex and crypto day trader. Analyse this TradingView chart screenshot.
  
  Focus on:
  1. Overall trend direction (bullish, bearish, or sideways)
  2. Key support and resistance levels visible
  3. Any liquidity grabs or stop hunts visible
  4. Candlestick patterns (engulfing, pin bar, doji, etc.)
  5. Price action and momentum
  
  Based on your analysis, provide:
  - A clear signal: BUY, SELL, or HOLD
  - Confidence level: 0.0 to 1.0
  - Brief reasoning (2-3 sentences max)
  
  Reply ONLY in this exact JSON format:
  {
    "signal": "BUY",
    "confidence": 0.75,
    "reasoning": "Your reasoning here."
  }`;
  
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY_HERE',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/png',
                  data: base64Image
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      })
    });
  
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error.message);
    }
  
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
  
    return parsed;
  }