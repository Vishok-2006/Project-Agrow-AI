/**
 * Environment Configuration Utility
 * Centralized access to environment variables
 * Created for: pvishok969@gmail.com
 */

// API Configuration
export const config = {
    // OpenAI Configuration
    openai: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
        maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS) || 1000,
        temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE) || 0.7,
    },

    // Backend Configuration
    backend: {
        url: import.meta.env.VITE_BACKEND_URL ||
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:5000'
                : ''),
        endpoints: {
            authLogin: import.meta.env.VITE_API_AUTH_LOGIN || '/auth/login',
            authRegister: import.meta.env.VITE_API_AUTH_REGISTER || '/auth/register',
            openaiChat: import.meta.env.VITE_API_OPENAI_CHAT || '/api/openai/chat',
            weather: import.meta.env.VITE_API_WEATHER || '/api/weather',
            health: import.meta.env.VITE_API_HEALTH || '/health',
        },
    },

    // Weather Configuration
    weather: {
        apiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
        defaultLocation: {
            latitude: parseFloat(import.meta.env.VITE_DEFAULT_LATITUDE) || 10.96,
            longitude: parseFloat(import.meta.env.VITE_DEFAULT_LONGITUDE) || 78.08,
        },
    },

    // Application Configuration
    app: {
        name: import.meta.env.VITE_APP_NAME || 'Agrow AI',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        description: import.meta.env.VITE_APP_DESCRIPTION || 'Intelligent Farming Assistant',
        userEmail: import.meta.env.VITE_USER_EMAIL || 'pvishok969@gmail.com',
    },

    // Feature Flags
    features: {
        demoMode: import.meta.env.VITE_ENABLE_DEMO_MODE === 'true',
        weather: import.meta.env.VITE_ENABLE_WEATHER !== 'false',
        cropPrediction: import.meta.env.VITE_ENABLE_CROP_PREDICTION === 'true',
        cropAnalysis: import.meta.env.VITE_ENABLE_CROP_ANALYSIS === 'true',
        knowledgeLibrary: import.meta.env.VITE_ENABLE_KNOWLEDGE_LIBRARY !== 'false',
    },

    // Security Configuration
    security: {
        sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000, // 1 hour
        tokenExpiry: parseInt(import.meta.env.VITE_TOKEN_EXPIRY) || 86400000, // 24 hours
    },

    // Development Configuration
    dev: {
        mode: import.meta.env.VITE_DEV_MODE === 'true',
        debug: import.meta.env.VITE_DEBUG_MODE === 'true',
        logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    },

    // Production Configuration
    production: {
        isProduction: import.meta.env.VITE_IS_PRODUCTION === 'true',
        backendUrl: import.meta.env.VITE_PRODUCTION_BACKEND_URL || '',
    },

    // Analytics (Optional)
    analytics: {
        gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
        sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
    },
};

// Helper function to get backend base URL
export const getBackendUrl = () => {
    if (config.production.isProduction && config.production.backendUrl) {
        return config.production.backendUrl;
    }
    return config.backend.url;
};

// Helper function to build full API endpoint
export const getApiEndpoint = (endpoint) => {
    const baseUrl = getBackendUrl();
    return `${baseUrl}${endpoint}`;
};

// Validation helper
export const validateConfig = () => {
    const warnings = [];
    const errors = [];

    // Check OpenAI API Key
    if (!config.openai.apiKey) {
        warnings.push('OpenAI API key not configured. AI chat will use demo mode.');
    } else if (!config.openai.apiKey.startsWith('sk-')) {
        errors.push('Invalid OpenAI API key format. Should start with "sk-"');
    }

    // Check Weather API Key
    if (!config.weather.apiKey && config.features.weather) {
        warnings.push('Weather API key not configured. Weather feature may not work.');
    }

    // Log warnings and errors
    if (config.dev.debug) {
        if (warnings.length > 0) {
            console.warn('⚠️ Configuration Warnings:', warnings);
        }
        if (errors.length > 0) {
            console.error('❌ Configuration Errors:', errors);
        }
        if (warnings.length === 0 && errors.length === 0) {
            console.log('✅ Configuration validated successfully');
        }
    }

    return { warnings, errors, isValid: errors.length === 0 };
};

// Log configuration in development mode
if (config.dev.mode && config.dev.debug) {
    console.log('🔧 Agrow AI Configuration:', {
        app: config.app,
        features: config.features,
        backend: getBackendUrl(),
        hasOpenAIKey: !!config.openai.apiKey,
        hasWeatherKey: !!config.weather.apiKey,
    });
    validateConfig();
}

export default config;
