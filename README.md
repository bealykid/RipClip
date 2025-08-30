# RipClip

A professional video analysis platform that provides AI-powered insights for content creators and video editors.

## Features

- **AI-Powered Analysis**: Advanced video analysis with frame-accurate feedback
- **Interactive Timeline**: Professional timeline interface with performance markers
- **Detailed Reports**: Comprehensive analysis reports with actionable recommendations
- **Export Options**: Professional EDL (Edit Decision List) and platform-specific exports
- **Premium UI**: Modern, responsive interface built with React and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ripclip
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI analysis features | Yes |
| `VITE_OPENAI_API_BASE` | Custom OpenAI API base URL (optional) | No |

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── lib/           # Utility functions and configurations
├── hooks/         # Custom React hooks
└── assets/        # Static assets
```

## Deployment

This project is configured for deployment on Netlify with automatic builds from the main branch.

### Netlify Configuration

The project includes:
- `_redirects` file for SPA routing
- Build command: `npm run build`
- Publish directory: `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Private repository - All rights reserved.

