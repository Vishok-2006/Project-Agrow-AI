import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Database
const users = [];

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Auth Routes
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Mock login - accept any email/password for demo, or check against mock db
    // For "test@example.com" / "password"
    if (email === 'test@example.com' && password === 'password') {
        return res.json({
            token: 'mock-jwt-token',
            user: {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                plan: 'premium'
            }
        });
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return res.json({
            token: 'mock-jwt-token',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                plan: 'free'
            }
        });
    }

    // Allow any login for demo purposes if not specific test user
    return res.json({
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: Date.now(),
            firstName: email.split('@')[0],
            lastName: 'User',
            email: email,
            plan: 'demo'
        }
    });
});

app.post('/auth/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const newUser = { id: Date.now(), firstName, lastName, email, password };
    users.push(newUser);
    res.json({
        token: 'mock-jwt-token',
        user: { ...newUser, plan: 'free' }
    });
});

// OpenAI Chat Proxy
app.post('/api/openai/chat', async (req, res) => {
    try {
        const { messages, model } = req.body;
        const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error('No OpenAI API Key configured');
        }

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: model || 'gpt-3.5-turbo',
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('OpenAI Error:', error.message);
        // Fallback response if API fails or no key
        res.status(500).json({
            error: 'OpenAI API Error',
            details: error.message,
            fallback: true
        });
    }
});

// Weather Proxy
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const apiKey = process.env.VITE_WEATHER_API_KEY || process.env.WEATHER_API_KEY;

        if (!apiKey) {
            throw new Error('No Weather API Key configured');
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        // Mock data if API fails
        res.json({
            name: 'Demo City',
            sys: { country: 'US' },
            main: { temp: 22, humidity: 45 },
            wind: { speed: 5 },
            weather: [{ main: 'Clear', description: 'clear sky' }]
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
