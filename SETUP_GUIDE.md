# 🔐 Environment Setup Guide for Agrow AI

## For: pvishok969@gmail.com

This guide will help you set up the environment variables for your Agrow AI chatbot application.

---

## 📋 Prerequisites

Before you begin, you'll need to obtain API keys from the following services:

### 1. **OpenAI API Key** (Required for AI Chat)
   - Visit: https://platform.openai.com/api-keys
   - Sign up or log in with your account
   - Click "Create new secret key"
   - Copy the key (starts with `sk-...`)
   - **Important**: Save it immediately, you won't see it again!

### 2. **OpenWeatherMap API Key** (Required for Weather Feature)
   - Visit: https://openweathermap.org/api
   - Click "Get API Key" or "Sign Up"
   - Create a free account
   - Go to API Keys section
   - Copy your API key
   - **Note**: Free tier allows 1000 calls/day

---

## 🚀 Quick Setup

### Step 1: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual API keys:

```env
# Replace this:
VITE_OPENAI_API_KEY=your_openai_api_key_here

# With your actual key:
VITE_OPENAI_API_KEY=sk-proj-abc123xyz...
```

```env
# Replace this:
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here

# With your actual key:
VITE_WEATHER_API_KEY=a1b2c3d4e5f6...
```

### Step 2: Verify Your Email

The `.env` file already includes your email:
```env
VITE_USER_EMAIL=pvishok969@gmail.com
```

### Step 3: Restart Development Server

After updating `.env`, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🔑 API Keys Reference

### OpenAI API Key
- **Format**: `sk-proj-...` or `sk-...`
- **Length**: ~51 characters
- **Cost**: Pay-as-you-go (GPT-4o-mini is very affordable)
- **Free Tier**: $5 credit for new accounts
- **Pricing**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens

### OpenWeatherMap API Key
- **Format**: 32-character hexadecimal string
- **Length**: 32 characters
- **Cost**: Free tier available
- **Free Tier**: 1,000 calls/day, 60 calls/minute
- **Upgrade**: $40/month for 100,000 calls/day

---

## 📝 Environment Variables Explained

### Essential Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-abc123...` |
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | `a1b2c3d4e5f6...` |
| `VITE_USER_EMAIL` | Your email address | `pvishok969@gmail.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_OPENAI_MODEL` | AI model to use | `gpt-4o-mini` |
| `VITE_BACKEND_URL` | Backend server URL | `http://localhost:5000` |
| `VITE_ENABLE_DEMO_MODE` | Enable offline mode | `true` |

---

## 🛠️ Backend Setup (Optional)

If you want to use a backend server instead of direct API calls:

### Option 1: Use Existing Backend
If you have a backend server running:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Option 2: Create Simple Backend
Create a simple Express.js backend:

```bash
# In a new directory
mkdir agrow-backend
cd agrow-backend
npm init -y
npm install express cors dotenv openai
```

Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/openai/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages
    });
    res.json(completion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
```

---

## ✅ Testing Your Setup

### Test 1: Check Environment Variables
```bash
# In your project directory
npm run dev
```

Open browser console and check:
```javascript
console.log(import.meta.env.VITE_OPENAI_API_KEY); // Should show your key
console.log(import.meta.env.VITE_USER_EMAIL); // Should show pvishok969@gmail.com
```

### Test 2: Test AI Chat
1. Open http://localhost:3000
2. Login (use demo mode if no backend)
3. Click "AI Assistant"
4. Send a message: "Hello, how can you help me?"
5. You should get an AI response

### Test 3: Test Weather
1. Click "Weather AI" in sidebar
2. Click "Use My Location" button
3. Allow location access
4. Weather data should load

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` file in `.gitignore`
- Never commit API keys to Git
- Use environment variables for all secrets
- Rotate API keys regularly
- Use different keys for development and production

### ❌ DON'T:
- Share your `.env` file
- Commit `.env` to version control
- Hardcode API keys in source code
- Use production keys in development
- Share API keys in screenshots or logs

---

## 🐛 Troubleshooting

### Problem: "OpenAI API key not found"
**Solution**: 
1. Check `.env` file has correct key
2. Restart dev server: `npm run dev`
3. Verify key starts with `sk-`

### Problem: "Weather data not loading"
**Solution**:
1. Check OpenWeatherMap API key
2. Verify API key is activated (takes ~10 minutes)
3. Check browser console for errors

### Problem: "CORS error"
**Solution**:
1. Use backend proxy instead of direct API calls
2. Or enable CORS in your backend

### Problem: Environment variables not updating
**Solution**:
1. Stop dev server (Ctrl+C)
2. Clear cache: `rm -rf node_modules/.vite`
3. Restart: `npm run dev`

---

## 📞 Support

If you encounter any issues:

1. **Check Logs**: Look at browser console (F12)
2. **Check Terminal**: Look for error messages
3. **Verify Keys**: Make sure API keys are correct
4. **Check Documentation**: 
   - OpenAI: https://platform.openai.com/docs
   - OpenWeatherMap: https://openweathermap.org/api

---

## 🎉 You're All Set!

Once you've configured your API keys:

1. ✅ AI Chat will work with real OpenAI responses
2. ✅ Weather data will show real-time information
3. ✅ All features will be fully functional

**Happy Farming! 🌾**

---

**Created for**: pvishok969@gmail.com  
**Project**: Agrow AI - Intelligent Farming Assistant  
**Date**: December 2, 2025
