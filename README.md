# 🌟 EmoCoach - Interactive AI Emotional Support Platform

A comprehensive emotional wellness application that provides AI-powered emotional support through engaging activities, interactive tools, and creative guidance using Replicate's Llama model.

## ✨ Features

### 🤖 **AI-Powered Coaching**
- **Creative AI Responses**: Uses Meta's Llama-3-8B model for empathetic, metaphor-rich responses
- **Mood-Specific Guidance**: Personalized prompts based on emotional states
- **Conversation Memory**: Maintains context across messages for deeper understanding

### 🎮 **Interactive Tools**
- **🎨 Emotion Wheel Explorer**: Visual emotion mapping with 6 categories and 30+ emotions
- **📝 Gratitude Journal**: Real-time entry system with streak tracking
- **🌬️ Guided Breathing Exercise**: Animated 4-phase breathing with progress tracking
- **📊 Mood Tracker**: Visual mood selection with AI integration

### 🏆 **Gamification System**
- **🔥 Streak Counter**: Track daily engagement and build consistency
- **🏆 Achievement System**: 5 unlockable achievements:
  - 🎯 First Steps (mood check-in)
  - 🌬️ Breathing Master (5 exercises)
  - 📝 Gratitude Warrior (10 entries)
  - 🎨 Emotion Explorer (all categories)
  - �� Consistency Champion (7-day streak)

### 🎯 **Interactive Exercises** (Framework Ready)
- **🎯 Goal Setting Workshop**: Interactive forms for goal creation
- **🧘 Mindfulness Meditation**: Timed meditation sessions
- **💪 Strength Assessment**: Self-discovery tools
- **🎨 Creative Expression**: Art therapy and creative release
- **🤝 Relationship Builder**: Communication skills development
- **�� Growth Tracker**: Progress monitoring and milestones

### 🎨 **Enhanced User Experience**
- **Modern UI**: Clean, responsive design with smooth animations
- **Visual Feedback**: Color-coded sections and interactive hover effects
- **Progress Tracking**: Visual indicators for all activities
- **Mobile-First**: Fully responsive design for all devices

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

Test frontend-backend integration:
```bash
npm run test-integration
```

## 📁 Project Structure

```
ai-emotional-agent/
├── app/
│   ├── api/chat/route.ts    # Backend API endpoint
│   └── page.tsx             # Interactive frontend interface
├── lib/prompt.ts            # Enhanced AI coaching prompts
├── .env.local               # API token configuration
└── package.json             # Dependencies and scripts
```

## 🎮 How to Use Interactive Features

### **Mood Tracking**
1. Click "📊 Mood" button
2. Select your current emotion
3. Get personalized AI response
4. Build your streak counter

### **Emotion Wheel Explorer**
1. Click "🎨 Emotion Wheel" in Quick Actions
2. Explore 6 emotion categories
3. Click any emotion to share with AI
4. Unlock "Emotion Explorer" achievement

### **Gratitude Journal**
1. Click "📝 Gratitude Journal" in Quick Actions
2. Write what you're grateful for
3. Press Enter or click "Add"
4. Track your entries and build streaks

### **Breathing Exercise**
1. Click "🌬️ Breathing Exercise" in Quick Actions
2. Follow the animated breathing circle
3. Complete 5 cycles (10 minutes)
4. Unlock "Breathing Master" achievement

### **Achievements**
1. Click "�� Achievements" in header
2. View your progress and unlocked badges
3. Track your journey to emotional wellness

## 🔧 How It Works

1. **Frontend** (`page.tsx`) - Interactive interface with gamification
2. **Backend** (`route.ts`) - Calls Replicate AI model with enhanced prompts
3. **AI Model** - Meta Llama-3-8B for creative, empathetic responses
4. **Gamification** - Streak tracking and achievement system
5. **Interactive Tools** - Multiple ways to engage beyond chatting

## 🎯 Key Features Explained

### **Creative AI Responses**
- Uses metaphors and visual language
- Provides actionable strategies
- Celebrates progress and small wins
- Asks thoughtful follow-up questions

### **Gamification Elements**
- **Streaks**: Encourage daily engagement
- **Achievements**: Provide motivation and recognition
- **Progress Tracking**: Visual feedback on improvement
- **Unlock System**: Reward consistent usage

### **Interactive Tools**
- **Emotion Wheel**: Visual emotion exploration
- **Gratitude Journal**: Daily positive practice
- **Breathing Exercise**: Stress relief and mindfulness
- **Mood Tracker**: Self-awareness and pattern recognition

## ⚠️ Important Notes

- Make sure your Replicate API token is valid
- The app runs on `localhost:3000` (or next available port)
- First request might be slower as the AI model loads
- Interactive exercises framework is ready for future implementation
- All gamification features work in real-time

## 🎯 Features

- **Multiple Interaction Methods**: Beyond just typing
- **Real-time Gamification**: Streaks, achievements, progress tracking
- **Visual Emotional Tools**: Emotion wheel, mood tracker, gratitude journal
- **Creative AI Responses**: Metaphor-rich, actionable guidance
- **Interactive Exercises**: Framework for future enhancements
- **Responsive Design**: Works on all devices
- **Progress Visualization**: Track emotional wellness journey

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add interactive EmoCoach features"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

### Environment Variables for Production
```
REPLICATE_API_TOKEN=your_production_token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

EmoCoach is designed to provide emotional support and should not replace professional mental health care. If you're experiencing a mental health crisis, please contact a qualified professional or emergency services.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Replicate](https://replicate.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for interactive emotional wellness**
