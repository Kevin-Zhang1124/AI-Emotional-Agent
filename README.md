# 🌟 EmoCoach - AI Emotional Support Chat

A simple chat application that provides AI-powered emotional support using Replicate's Llama model.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up API Token
1. Get your token from [Replicate API Tokens](https://replicate.com/account/api-tokens)
2. Edit `.env.local` and replace `your_replicate_api_token_here` with your actual token

### 3. Start the Application
```bash
npm run dev
```

### 4. Open Your Browser
Go to: `http://localhost:3000`

## 🧪 Testing

Test the backend API:
```bash
npm run test-api
```

## 📁 Project Structure

```
ai-emotional-agent/
├── app/
│   ├── api/chat/route.ts    # Backend API endpoint
│   └── page.tsx             # Frontend chat interface
├── lib/prompt.ts            # AI coaching prompts
├── .env.local               # API token configuration
└── package.json             # Dependencies and scripts
```

## 🔧 How It Works

1. **Frontend** (`page.tsx`) - Clean chat interface
2. **Backend** (`route.ts`) - Calls Replicate AI model
3. **AI Model** - Meta Llama-3-8B for empathetic responses

## ⚠️ Important Notes

- Make sure your Replicate API token is valid
- The app runs on `localhost:3000` (or next available port)
- First request might be slower as the AI model loads

## 🎯 Features

- Real-time chat with AI emotional coach
- Conversation memory
- Clean, simple interface
- Responsive design

---

**Built with Next.js + Replicate AI**
