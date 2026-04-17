# 🔍 MarketLens

> AI-powered trading assistant that watches your live TradingView 
> charts and delivers real-time buy/sell signals — like having an 
> expert trader analysing the market beside you.

## What is MarketLens?

MarketLens is a browser extension that monitors your TradingView 
charts in real time using AI vision. Instead of relying on 
traditional indicators, it reads price action visually — exactly 
the way an experienced trader would.

## How It Works

1. Open any chart on TradingView
2. MarketLens activates automatically
3. On every candle close, it captures and analyses the chart
4. AI identifies key patterns and market structure
5. You receive an instant signal with clear reasoning

## Getting Started

### 1. Install the extension

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Toggle **Developer mode** on (top right).
4. Click **Load unpacked** and select the `marketlens` folder.

### 2. Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign in.
2. Navigate to **API Keys** and click **Create Key**.
3. Copy the key — it starts with `sk-ant-...`.

### 3. Add your key to MarketLens

1. Right-click the MarketLens icon in the Chrome toolbar.
2. Select **Options**.
3. Paste your API key into the field and click **Save**.

Your key is stored locally via `chrome.storage.local` and is never committed to the repo.

### 4. Run an analysis

1. Open a chart on [TradingView](https://www.tradingview.com).
2. Click the MarketLens icon — the side panel opens on the right.
3. Click **🔍 Analyse Chart** to get an instant BUY / SELL / HOLD signal with reasoning.

The side panel stays open until you close it, so signals remain visible while you work.

## What It Analyses

- Support & resistance levels
- Liquidity grabs and stop hunts
- Trend direction and structure breaks
- Candlestick patterns
- Price action and momentum

## Target Timeframes

- 15 minute charts
- 1 hour charts

## Tech Stack

- Chrome Extension (Manifest V3)
- JavaScript / HTML / CSS
- AI Vision API (Claude / GPT-4 Vision)
- TradingView (browser-based)

## Project Status

🚧 Currently in active development — Phase 1 (MVP)

## Roadmap

- [ ] Phase 1: Core extension — chart capture + AI signal
- [ ] Phase 2: Confidence scoring + SL/TP suggestions
- [ ] Phase 3: Multi-timeframe analysis
- [ ] Phase 4: Chrome Web Store release

## Author

Built by Shahadat Hossain — day trader and AI enthusiast based 
in London, UK.

LinkedIn: https://www.linkedin.com/in/shahadat-hossain05/
