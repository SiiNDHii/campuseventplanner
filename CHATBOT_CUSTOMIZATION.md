# AI Chatbot Implementation - File Structure

## 📁 Files Created

### 1. Server-Side Logic
```
src/app/actions/chat.ts
├─ sendChatMessage(userMessage) - Main chat handler
├─ getEventContext() - Fetches events for AI context
└─ System prompt with event data
```

### 2. Client Components  
```
src/components/chatbot/
├─ Chatbot.tsx - Floating chat button & wrapper
└─ ChatWindow.tsx - Chat UI, messages, input
```

### 3. API Endpoint
```
src/app/api/chat/route.ts
└─ POST /api/chat - REST endpoint (alternative to server action)
```

### 4. Integration
```
src/components/providers/AppProviders.tsx
└─ Added <Chatbot /> component (global to all pages)
```

### 5. Documentation
```
CHATBOT_SETUP.md - Complete setup guide
```

---

## 🎯 How to Customize

### Change Chat Button Color
File: `src/components/chatbot/Chatbot.tsx:19-23`
```typescript
// Change: bg-gradient-to-br from-violet-500 to-violet-600
// Examples:
// - Blue: from-blue-500 to-blue-600
// - Green: from-green-500 to-green-600
// - Purple: from-purple-500 to-purple-600
```

### Change Chat Window Size
File: `src/components/chatbot/ChatWindow.tsx:72`
```typescript
// Change: w-96 h-[600px]
// Examples:
// - Wider: w-[500px]
// - Taller: h-[700px]
// - Mobile: max-w-[calc(100vw-1.5rem)]
```

### Modify Chat Greeting
File: `src/components/chatbot/ChatWindow.tsx:31-35`
```typescript
{
  id: "welcome",
  content: "Your custom greeting message here!",
  sender: "bot",
  timestamp: new Date(),
}
```

### Adjust AI Personality
File: `src/app/actions/chat.ts:50-65`

Edit the `systemPrompt` string to change:
- Tone and personality
- Knowledge domain
- Response style
- Special instructions

### Change Response Length
File: `src/app/actions/chat.ts:83`
```typescript
max_tokens: 150, // Change to 200, 300, etc.
```

### Use Different AI Model
File: `src/app/actions/chat.ts:76`
```typescript
model: "gpt-3.5-turbo", // Change to:
// - "gpt-4" (more intelligent, slower, expensive)
// - "gpt-4-turbo" (fast GPT-4)
```

---

## 🔧 API Endpoint Usage

### Direct API Call
```yaml
POST /api/chat
Content-Type: application/json

{
  "message": "What events are happening?"
}

Response:
{
  "response": "Here are the upcoming events..."
}
```

### JavaScript Example
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Tell me about events' })
});
const data = await response.json();
console.log(data.response);
```

---

## ⚙️ Configuration Options

### Environment Variables (.env)
```
OPENAI_API_KEY=sk-xxxx  # Your OpenAI API key
```

### System Prompt Elements
- Event data: Auto-fetched from database
- Custom instructions: Edit systemPrompt in chat.ts
- Temperature: Controls randomness (0.7 default)
- Max tokens: Controls response length (150 default)

---

## 🐛 Debugging

### Check if chatbot loads:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Look for floating button in bottom-right

### Test server action:
```javascript
// In browser console:
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello' })
}).then(r => r.json()).then(console.log);
```

### Enable debug logs:
Edit `src/app/actions/chat.ts` and add:
```typescript
console.log('User message:', userMessage);
console.log('Events found:', events.length);
console.log('Bot response:', botMessage);
```

---

## 📊 Performance Tips

1. **Cache events**: Consider caching event data for 5 minutes
2. **Limit history**: Keep message history under 100 messages
3. **Rate limit**: Add request throttling for free OpenAI tier
4. **Optimize prompts**: Shorter system prompts = faster responses

---

## 🔐 Security Checklist

- [ ] API key in `.env` (never commit)
- [ ] Use `.env.local` for local development  
- [ ] Validate all user inputs in chat.ts
- [ ] Monitor OpenAI usage on dashboard
- [ ] Set spending limits on OpenAI account
- [ ] Use role-based access if storing chats in DB

---

## 📈 What's Next?

**Phase 2 Enhancement Ideas:**
- [ ] Save chat history to database
- [ ] Multi-turn conversations with memory
- [ ] Let users book events via chat
- [ ] Add sentiment analysis
- [ ] Generate event summaries
- [ ] Support multiple languages
- [ ] Voice input/output

---

## 🆘 Common Issues

**"Chatbot not visible?"**
- Check AppProviders.tsx has Chatbot import
- Restart dev server
- Clear browser cache

**"API key error?"**
- Verify key is in .env correctly
- Check key is active on openai.com
- Ensure key has available credits

**"Slow responses?"**
- Check OpenAI account usage limits
- Try shorter max_tokens
- Consider switching to gpt-3.5-turbo-16k

---

Generated: April 2026
Stack: Next.js 16 + React 19 + TypeScript + Tailwind CSS
AI Model: OpenAI GPT-3.5 Turbo
