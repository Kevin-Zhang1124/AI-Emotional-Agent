# EmoCoach Backend Setup

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Replicate API Token
1. Go to https://replicate.com/account/api-tokens
2. Create a new token
3. Copy the token and replace `your_replicate_api_token_here` in `.env.local`

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the API
In another terminal:
```bash
npm run test-api
```

## API Endpoint

**POST** `/api/chat`

**Request Body:**
```json
{
  "message": "I'm feeling anxious about my presentation",
  "conversationHistory": "Previous conversation context..."
}
```

**Response:**
```json
{
  "response": "I understand that presentations can feel overwhelming...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Files Created

- `app/api/chat/route.ts` - Main API endpoint
- `lib/prompt.ts` - AI coaching prompt template
- `.env.local` - Environment variables
- `test-api.js` - Simple API test script

## Model Configuration

Using `meta/meta-llama-3-8b-instruct` with:
- Max tokens: 200
- Temperature: 0.7 (balanced creativity)
- Top-p: 0.9 (focused responses)
- Repetition penalty: 1.1 (avoids loops)

## Troubleshooting

1. **API Token Error**: Make sure your Replicate token is valid
2. **CORS Issues**: The API includes CORS headers for frontend integration
3. **Rate Limits**: Replicate has usage limits - check your account
4. **Model Loading**: First request might be slower as model loads

## Next Steps

Your friend can now integrate this API into the frontend by calling:
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userInput })
});
```
