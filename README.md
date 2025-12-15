# VeriChain

A blockchain-powered news verification platform with AI analysis. VeriChain uses Google's Gemini AI to analyze news articles for credibility, bias, and factual accuracy, then records the results in an immutable blockchain ledger.

## Features

- **AI-Powered Analysis**: Leverages Google Gemini 2.5 Flash for comprehensive article evaluation
- **Credibility Scoring**: Assigns a credibility score (0-10) to each analyzed article
- **Bias Detection**: Identifies political bias and tone in news content
- **Blockchain Ledger**: Immutable record of all analyses with cryptographic verification
- **Classic Newspaper Design**: Elegant broadsheet-inspired UI with vintage typography
- **Latest News Integration**: Fetch and analyze current headlines automatically

## Setup

### Prerequisites

- Node.js (v16 or higher)
- A Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ayushjo/VeriChain.git
cd VeriChain
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   - Get your API key from: https://aistudio.google.com/apikey

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:4000`

## Usage

### Analyzing Articles

1. Navigate to the **Analyzer** tab
2. Either:
   - Paste article text into the textarea, or
   - Click "Fetch Latest News Headlines" to analyze current news
3. Click "Analyze Article"
4. Review the AI-generated analysis including:
   - Credibility score
   - Factual accuracy assessment
   - Bias analysis
   - Source reliability
5. Click "Record to Blockchain Ledger" to create an immutable record

### Viewing the Ledger

1. Navigate to the **Ledger** tab
2. View all analyzed articles with:
   - Block number and timestamp
   - Summary and credibility score
   - Cryptographic hash verification
   - Chain validity status

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom newspaper theme
- **AI**: Google Gemini 2.5 Flash
- **Blockchain**: Custom implementation with SHA-256 hashing

## Design Philosophy

VeriChain features a "Classic Broadsheet Newspaper" theme inspired by publications like The New York Times and Wall Street Journal. The design emphasizes:

- **Authority & Trustworthiness**: High-contrast serif typography
- **Classic Aesthetics**: Playfair Display, Merriweather, and Libre Baskerville fonts
- **Paper Texture**: Subtle noise overlay on cream background
- **Sharp Borders**: Solid black lines instead of soft shadows
- **Typewriter Input**: Courier Prime monospace for article text

## Security

- API keys are stored in `.env.local` and excluded from version control
- Never commit `.env.local` to git
- The `.env.example` file provides a template for required environment variables

## License

© 2024 VeriChain • AI-powered news verification with blockchain ledger

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
