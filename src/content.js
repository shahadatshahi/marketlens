// MarketLens - Content Script
// This runs on TradingView pages

// Notify background that MarketLens is active on this page
chrome.runtime.sendMessage({ action: 'pageReady', url: window.location.href });

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPageInfo') {
    sendResponse({
      url: window.location.href,
      title: document.title,
      isTradingView: window.location.href.includes('tradingview.com')
    });
  }
});

console.log('MarketLens is active on this page.');