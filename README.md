# Agrow AI - React Version

This is the React.js version of the Agrow AI farming assistant application.

## Project Structure

```
/home/devil/Documents/Project/
├── index.html              # React entry point (updated)
├── index.html.backup       # Original HTML file (backup)
├── package.json            # NPM dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx           # React app entry point
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── components/
│       ├── AuthContainer.jsx      # Login/Signup component
│       ├── MainContent.jsx        # Main layout component
│       ├── Sidebar.jsx            # Sidebar navigation
│       ├── ChatInterface.jsx      # Chat interface wrapper
│       └── tools/
│           ├── AssistantContent.jsx   # AI Assistant chat
│           ├── WeatherContent.jsx     # Weather tool
│           ├── PredictionContent.jsx  # Crop prediction
│           ├── AnalysisContent.jsx    # Image analysis
│           └── LibraryContent.jsx     # Knowledge library
```

## Features

- **Authentication System**: Login and signup with demo mode fallback
- **AI Assistant**: Chat interface with OpenAI integration
- **Weather Tool**: Real-time weather data for farming
- **Crop Prediction**: AI-powered yield forecasting (placeholder)
- **Crop Analysis**: Image upload for disease detection (placeholder)
- **Knowledge Library**: Searchable farming resources

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Key Changes from Original HTML

1. **Component-Based Architecture**: Split into reusable React components
2. **State Management**: Using React hooks (useState, useEffect)
3. **Modern Build System**: Vite for fast development and optimized builds
4. **Improved Code Organization**: Separated concerns into different files
5. **Better Maintainability**: Easier to update and extend features

## Backend Integration

The app expects a backend server at:
- Local: `http://localhost:5000`
- Production: Same domain (relative URLs)

Backend endpoints used:
- `/auth/login` - User login
- `/auth/register` - User registration
- `/api/weather` - Weather data proxy
- `/api/openai/chat` - AI chat completions
- `/health` - Backend health check

## Demo Mode

If the backend is not available, the app automatically falls back to demo mode with:
- Local authentication (no server required)
- Offline AI responses with predefined answers
- Mock data for testing

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Font Awesome** - Icons
- **Tailwind CSS** - Utility classes (via CDN in original, now custom CSS)
- **Google Fonts (Outfit)** - Typography

## Notes

- The original HTML file is backed up as `index.html.backup`
- All functionality from the original HTML has been preserved
- The React version is more maintainable and scalable
- Styling matches the original design with glassmorphism effects
# Project-Agrow-AI
