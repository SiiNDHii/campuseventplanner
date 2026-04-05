# Campus Event Planner - AI Chatbot Setup Guide

## 🤖 Chatbot Features

- **Floating Chat Widget**: Bottom-right corner of the app
- **Event-Aware Responses**: Understands campus events from your database
- **Smart Assistant**: Helps with registration, event info, and campus guidance
- **Real-time Responses**: Uses OpenAI GPT-3.5 for intelligent responses
- **Smooth UI**: Modern design with animations and transitions
- **Error Handling**: Graceful fallbacks and loading states

## 📋 Components Created

1. **Server Action** (`src/app/actions/chat.ts`)
   - Handles chatbot logic on the server
   - Fetches event context from database
   - Communicates with OpenAI API
   - Returns intelligent responses

2. **Chatbot Component** (`src/components/chatbot/Chatbot.tsx`)
   - Floating chat button (bottom-right)
   - Toggle chat window visibility
   - Modern gradient design

3. **Chat Window** (`src/components/chatbot/ChatWindow.tsx`)
   - Message display with user/bot differentiation
   - Real-time chat input
   - Loading indicator
   - Auto-scroll to latest messages
   - Smooth animations

4. **API Route** (`src/app/api/chat/route.ts`)
   - REST API endpoint for chat (optional)
   - Alternative to server actions

5. **Integration** (`src/components/providers/AppProviders.tsx`)
   - Added globally to all pages
   - Works with existing theme system

## 🔑 Setup Instructions

### Step 1: Get OpenAI API Key
1. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Sign up or log in with your OpenAI account
3. Create a new API key
4. Copy the key (starts with `sk-`)

### Step 2: Add API Key to Environment
Update your `.env` file:
```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="campus-event-planner-dev-secret-change-in-production"
OPENAI_API_KEY="sk-your-api-key-here"
```

Replace `sk-your-api-key-here` with your actual OpenAI API key.

### Step 3: Restart Dev Server
The dev server should auto-reload, but to be safe:
```bash
# Stop the server with Ctrl+C
# Then restart:
npm run dev
```

### Step 4: Test the Chatbot
1. Open http://localhost:3000 in your browser
2. Look for the **purple chat bubble** in the bottom-right corner
3. Click it to open the chat window
4. Try asking:
   - "What events are available?"
   - "How do I register for an event?"
   - "Tell me about campus events"
   - "When is the next event?"

## 💬 Example Prompts to Test

- ✅ "What events are happening this week?"
- ✅ "Tell me about the event at [venue]"
- ✅ "How do I register?"
- ✅ "What time does the event start?"
- ✅ "Are there any tech events?"
- ✅ "How do I login?"
- ✅ "Help me find campus events"

## 🎨 Customization Options

### Change Chat Button Position
Edit `src/components/chatbot/Chatbot.tsx`:
```typescript
// Change: bottom-6 right-6
// To: bottom-6 left-6 (move to left)
// Or: bottom-24 right-6 (move up)
```

### Adjust Window Size
Edit `src/components/chatbot/ChatWindow.tsx`:
```typescript
// Change: h-[600px] w-96
// To your preferred dimensions
```

### Customize System Prompt
Edit `src/app/actions/chat.ts` and modify the `systemPrompt` string to change the chatbot's personality and behavior.

### Change Color Scheme
Replace `violet-500` and `violet-600` throughout the chatbot components with your preferred Tailwind colors (e.g., `blue-500`, `green-500`).

## ⚙️ How It Works

1. **User sends message** → Chatbot component captures it
2. **Server action processes** → `sendChatMessage()` adds event context
3. **OpenAI API called** → Generates response with system prompt
4. **Response returned** → Displayed in chat window
5. **Auto-scroll** → Latest message always visible

## 🔒 Security Notes

- **API Key**: Never commit your API key to git. Use `.env.local` for local development
- **Cost**: OpenAI charges per API call. Monitor your usage at platform.openai.com
- **Message Format**: All messages are validated before processing
- **Error Handling**: Graceful errors prevent crashes

## 📊 Models Available

Current setup uses `gpt-3.5-turbo` (fastest and most cost-effective).

To upgrade to GPT-4, edit `src/app/actions/chat.ts`:
```typescript
model: "gpt-4", // instead of gpt-3.5-turbo
```

## 🆘 Troubleshooting

### Chatbot not appearing?
- Check if `OPENAI_API_KEY` is in `.env`
- Restart dev server: `npm run dev`
- Check browser console for errors (F12)

### API key not working?
- Verify key is correct (starts with `sk-`)
- Check OpenAI account has credits
- Ensure key is not expired

### Responses are generic?
- The chatbot pulls events from your database
- Make sure you have published events in the system
- Check the system prompt in `chat.ts` for customization

### Rate limiting?
- OpenAI has rate limits on free/trial accounts
- Wait a few seconds between messages
- Upgrade your OpenAI plan if needed

## 📦 Dependencies Added

- `openai` - Official OpenAI client library

All other dependencies were already in your project.

## 🚀 Next Steps (Optional Enhancements)

1. **Memory**: Store conversation history in database
2. **Analytics**: Track common questions users ask
3. **Booking**: Let chatbot help users register for events directly
4. **Multi-language**: Support different languages
5. **Voice**: Add speech-to-text capability
6. **Feedback**: Rate bot responses to improve prompts

## 📞 Support

If you have issues:
1. Check `.env` file has `OPENAI_API_KEY`
2. Verify OpenAI account is active and has balance
3. Check browser console for error messages
4. Restart dev server and clear browser cache

---

**Happy Chatting!** 🎉
