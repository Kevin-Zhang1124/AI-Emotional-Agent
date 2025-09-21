'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'mood' | 'exercise' | 'creative';
}

interface MoodData {
  mood: string;
  intensity: number;
  timestamp: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: Date;
}

export default function EmoCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm EmoCoach, your interactive AI emotional support companion. I'm here to help you through engaging activities, exercises, and tools beyond just chatting. Let's explore your emotional wellness together! 🌟",
      isUser: false,
      timestamp: new Date(),
      type: 'creative'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [showCreativeTools, setShowCreativeTools] = useState(false);
  const [showInteractiveExercises, setShowInteractiveExercises] = useState(false);
  const [showProgressTracking, setShowProgressTracking] = useState(false);
  const [showEmotionWheel, setShowEmotionWheel] = useState(false);
  const [showGratitudeJournal, setShowGratitudeJournal] = useState(false);
  const [gratitudeEntries, setGratitudeEntries] = useState<string[]>([]);
  const [newGratitudeEntry, setNewGratitudeEntry] = useState('');
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'First Steps', description: 'Complete your first mood check-in', icon: '🎯', unlocked: false },
    { id: '2', title: 'Breathing Master', description: 'Complete 5 breathing exercises', icon: '🌬️', unlocked: false },
    { id: '3', title: 'Gratitude Warrior', description: 'Write 10 gratitude entries', icon: '📝', unlocked: false },
    { id: '4', title: 'Emotion Explorer', description: 'Use all emotion wheel categories', icon: '🎨', unlocked: false },
    { id: '5', title: 'Consistency Champion', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false }
  ]);
  const [showAchievements, setShowAchievements] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const moods = [
    { emoji: '😊', label: 'Happy', color: '#10b981' },
    { emoji: '😔', label: 'Sad', color: '#3b82f6' },
    { emoji: '😰', label: 'Anxious', color: '#f59e0b' },
    { emoji: '😡', label: 'Angry', color: '#ef4444' },
    { emoji: '😴', label: 'Tired', color: '#6b7280' },
    { emoji: '😌', label: 'Calm', color: '#8b5cf6' },
    { emoji: '😟', label: 'Worried', color: '#f97316' },
    { emoji: '🤗', label: 'Lonely', color: '#ec4899' }
  ];

  const emotionWheelCategories = [
    { name: 'Joy', emotions: ['Happy', 'Excited', 'Grateful', 'Proud', 'Content'], color: '#10b981' },
    { name: 'Sadness', emotions: ['Sad', 'Lonely', 'Disappointed', 'Grief', 'Melancholy'], color: '#3b82f6' },
    { name: 'Anger', emotions: ['Angry', 'Frustrated', 'Irritated', 'Resentful', 'Furious'], color: '#ef4444' },
    { name: 'Fear', emotions: ['Anxious', 'Worried', 'Scared', 'Nervous', 'Panicked'], color: '#f59e0b' },
    { name: 'Surprise', emotions: ['Surprised', 'Amazed', 'Shocked', 'Astonished', 'Confused'], color: '#8b5cf6' },
    { name: 'Disgust', emotions: ['Disgusted', 'Repulsed', 'Revolted', 'Disturbed', 'Offended'], color: '#6b7280' }
  ];

  const interactiveExercises = [
    {
      id: '1',
      title: '🎯 Goal Setting Workshop',
      description: 'Interactive goal setting with visualization',
      component: 'GoalSetting'
    },
    {
      id: '2',
      title: '🧘 Mindfulness Meditation',
      description: 'Guided meditation with progress tracking',
      component: 'Meditation'
    },
    {
      id: '3',
      title: '💪 Strength Assessment',
      description: 'Discover and build your personal strengths',
      component: 'StrengthAssessment'
    },
    {
      id: '4',
      title: '🎨 Creative Expression',
      description: 'Art therapy and creative emotional release',
      component: 'CreativeExpression'
    },
    {
      id: '5',
      title: '🤝 Relationship Builder',
      description: 'Improve communication and relationships',
      component: 'RelationshipBuilder'
    },
    {
      id: '6',
      title: '🌱 Growth Tracker',
      description: 'Track personal growth and milestones',
      component: 'GrowthTracker'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showBreathingExercise) {
      interval = setInterval(() => {
        setBreathingPhase(prev => {
          switch (prev) {
            case 'inhale': return 'hold';
            case 'hold': return 'exhale';
            case 'exhale': return 'rest';
            case 'rest': 
              setBreathingCount(count => count + 1);
              return 'inhale';
            default: return 'inhale';
          }
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [showBreathingExercise]);

  const sendMessage = async (messageText: string, isMoodSpecific: boolean = false) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .slice(-6)
        .map(msg => `${msg.isUser ? 'User' : 'EmoCoach'}: ${msg.text}`)
        .join('\n');

      const enhancedPrompt = isMoodSpecific 
        ? `The user just selected their mood and shared: "${messageText}". Provide a creative, personalized response that acknowledges their emotional state and offers specific, actionable guidance. Use metaphors, visualization techniques, or creative exercises. Make it feel personal and helpful.`
        : `User message: ${messageText}\n\nConversation context: ${conversationHistory}\n\nRespond as EmoCoach with creativity, empathy, and actionable guidance. Use metaphors, specific techniques, and make your response feel personal and helpful.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: enhancedPrompt,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          type: 'creative'
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. 💜",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    const moodData: MoodData = {
      mood,
      intensity: 5,
      timestamp: new Date()
    };
    setMoodHistory(prev => [...prev, moodData]);
    setStreak(prev => prev + 1);
    checkAchievements();
    sendMessage(`I'm feeling ${mood.toLowerCase()} right now.`, true);
    setShowMoodTracker(false);
  };

  const addGratitudeEntry = () => {
    if (newGratitudeEntry.trim()) {
      setGratitudeEntries(prev => [...prev, newGratitudeEntry]);
      setNewGratitudeEntry('');
      setStreak(prev => prev + 1);
      checkAchievements();
    }
  };

  const checkAchievements = () => {
    setAchievements(prev => prev.map(achievement => {
      if (!achievement.unlocked) {
        switch (achievement.id) {
          case '1':
            if (moodHistory.length >= 1) {
              return { ...achievement, unlocked: true, date: new Date() };
            }
            break;
          case '2':
            if (breathingCount >= 5) {
              return { ...achievement, unlocked: true, date: new Date() };
            }
            break;
          case '3':
            if (gratitudeEntries.length >= 10) {
              return { ...achievement, unlocked: true, date: new Date() };
            }
            break;
          case '5':
            if (streak >= 7) {
              return { ...achievement, unlocked: true, date: new Date() };
            }
            break;
        }
      }
      return achievement;
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const startBreathingExercise = () => {
    setShowBreathingExercise(true);
    setBreathingCount(0);
    setBreathingPhase('inhale');
  };

  const stopBreathingExercise = () => {
    setShowBreathingExercise(false);
    setBreathingCount(0);
  };

  const renderInteractiveExercise = (exerciseId: string) => {
    switch (exerciseId) {
      case '1':
        return (
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', margin: '1rem 0' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>🎯 Goal Setting Workshop</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What's your main goal?</label>
                <input type="text" placeholder="e.g., Improve my confidence" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Why is this important to you?</label>
                <textarea placeholder="Describe why this goal matters..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', minHeight: '100px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What's your first step?</label>
                <input type="text" placeholder="e.g., Practice positive self-talk daily" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
              </div>
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                Save My Goal
              </button>
            </div>
          </div>
        );
      case '2':
        return (
          <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', margin: '1rem 0' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>🧘 Mindfulness Meditation</h3>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘‍♀️</div>
              <p style={{ marginBottom: '1rem' }}>Close your eyes and focus on your breathing...</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  5 Minutes
                </button>
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  10 Minutes
                </button>
                <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  15 Minutes
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Exercise coming soon...</div>;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#8b5cf6', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}>
              💜
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>EmoCoach</h1>
              <p style={{ fontSize: '0.875rem', margin: 0, color: '#64748b' }}>Interactive Emotional Support</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Streak:</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#f59e0b' }}>🔥 {streak}</span>
            </div>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🏆 Achievements
            </button>
            <button
              onClick={() => setShowInteractiveExercises(!showInteractiveExercises)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🎮 Interactive
            </button>
            <button
              onClick={() => setShowMoodTracker(!showMoodTracker)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📊 Mood
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#059669' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
              Online
            </div>
          </div>
        </div>
      </header>

      {/* Achievements Panel */}
      {showAchievements && (
        <div style={{
          backgroundColor: '#fef3c7',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🏆 Your Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: achievement.unlocked ? 'white' : '#f3f4f6',
                    border: `2px solid ${achievement.unlocked ? '#10b981' : '#d1d5db'}`,
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: achievement.unlocked ? 1 : 0.6
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{achievement.icon}</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b' }}>{achievement.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#10b981' }}>
                        Unlocked: {achievement.date.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Exercises */}
      {showInteractiveExercises && (
        <div style={{
          backgroundColor: '#f0f9ff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🎮 Interactive Emotional Exercises</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {interactiveExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => renderInteractiveExercise(exercise.id)}
                  style={{
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.backgroundColor = '#3b82f610';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#1e293b' }}>{exercise.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>{exercise.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emotion Wheel */}
      {showEmotionWheel && (
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🎨 Emotion Wheel Explorer</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {emotionWheelCategories.map((category) => (
                <div
                  key={category.name}
                  style={{
                    padding: '1rem',
                    backgroundColor: category.color + '10',
                    border: `2px solid ${category.color}`,
                    borderRadius: '0.75rem'
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem 0', color: category.color, fontSize: '1rem' }}>{category.name}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {category.emotions.map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => sendMessage(`I'm feeling ${emotion.toLowerCase()} right now.`)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'white',
                          border: `1px solid ${category.color}`,
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          color: category.color
                        }}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gratitude Journal */}
      {showGratitudeJournal && (
        <div style={{
          backgroundColor: '#f0fdf4',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>📝 Gratitude Journal</h3>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newGratitudeEntry}
                onChange={(e) => setNewGratitudeEntry(e.target.value)}
                placeholder="What are you grateful for today?"
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                onKeyPress={(e) => e.key === 'Enter' && addGratitudeEntry()}
              />
              <button
                onClick={addGratitudeEntry}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {gratitudeEntries.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>✨</span>
                  <span style={{ flex: 1 }}>{entry}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mood Tracker */}
      {showMoodTracker && (
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>How are you feeling right now?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => handleMoodSelect(mood.label)}
                  style={{
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    fontSize: '2rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = mood.color;
                    e.currentTarget.style.backgroundColor = mood.color + '10';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <span>{mood.emoji}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breathing Exercise */}
      {showBreathingExercise && (
        <div style={{
          backgroundColor: '#8b5cf6',
          color: 'white',
          padding: '2rem 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>🌬️ Breathing Exercise</h2>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              transition: 'transform 2s ease-in-out',
              transform: breathingPhase === 'inhale' ? 'scale(1.2)' : breathingPhase === 'exhale' ? 'scale(0.8)' : 'scale(1)'
            }}>
              {breathingPhase === 'inhale' && 'Breathe In'}
              {breathingPhase === 'hold' && 'Hold'}
              {breathingPhase === 'exhale' && 'Breathe Out'}
              {breathingPhase === 'rest' && 'Rest'}
            </div>
            <p style={{ margin: '0 0 1rem 0' }}>Cycle {breathingCount + 1} of 5</p>
            <button
              onClick={stopBreathingExercise}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'white',
                color: '#8b5cf6',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Complete Exercise
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!showBreathingExercise && (
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => setShowEmotionWheel(!showEmotionWheel)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ec4899',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🎨 Emotion Wheel
              </button>
              <button
                onClick={() => setShowGratitudeJournal(!showGratitudeJournal)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                📝 Gratitude Journal
              </button>
              <button
                onClick={startBreathingExercise}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🌬️ Breathing Exercise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '1.5rem',
        overflowY: 'auto',
        minHeight: '400px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{ 
                display: 'flex', 
                justifyContent: message.isUser ? 'flex-end' : 'flex-start' 
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  borderRadius: '1rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: message.isUser ? '#8b5cf6' : 'white',
                  color: message.isUser ? 'white' : '#1e293b',
                  boxShadow: message.isUser ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: message.isUser ? 'none' : '1px solid #e2e8f0',
                  position: 'relative'
                }}
              >
                {message.type === 'creative' && !message.isUser && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '12px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ✨ Creative Response
                  </div>
                )}
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>{message.text}</p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  fontSize: '0.75rem', 
                  opacity: 0.7 
                }}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: '#8b5cf6', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    🤖
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite 0.1s' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#64748b', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer style={{ 
        backgroundColor: 'white', 
        borderTop: '1px solid #e2e8f0',
        padding: '1rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what you're feeling... or try the interactive tools above! ✨"
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '1rem',
                  resize: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#f9fafb',
                  minHeight: '48px',
                  maxHeight: '120px'
                }}
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={() => {
                  sendMessage(inputMessage);
                  setInputMessage('');
                }}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  position: 'absolute',
                  right: '8px',
                  bottom: '8px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1
                }}
              >
                ➤
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              💜 EmoCoach provides interactive emotional support. Remember, this is not a substitute for professional mental health care.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
