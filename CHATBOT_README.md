# 🤖 AI Chatbot - Quick Start Guide

## ⚡ 30-Second Setup

1. **Get OpenAI API Key**
   - Visit: https://platform.openai.com/api-keys
   - Create new API key (copy the `sk-...` key)

2. **Add to .env**
   ```
   OPENAI_API_KEY="sk-your-api-key-here"
   ```

3. **Restart Dev Server**
   - Stop current server (Ctrl+C)
   - Run: `npm run dev`

4. **That's It!**
   - Look for purple chat button in bottom-right
   - Click to test the chatbot

---

## 🎯 What You Get

✅ Floating chat bubble on every page
✅ Event-aware AI responses
✅ Real-time ChatGPT responses  
✅ Modern UI with animations
✅ Mobile-friendly design
✅ Beautiful dark/light theme support

---

## 🧪 Test It Out

### Try these questions:
- "What events are available?"
- "When is the next event?"
- "How do I register?"
- "Tell me about campus events"
- "What time does the event start?"
- "Are there tech events?"

---

## 📁 Files Created

```
✅ src/app/actions/chat.ts               (Server action)
✅ src/app/api/chat/route.ts             (API endpoint)
✅ src/components/chatbot/Chatbot.tsx    (Chat button)
✅ src/components/chatbot/ChatWindow.tsx (Chat window)
✅ Updated: AppProviders.tsx             (Integration)
✅ Updated: .env                         (API key config)
```

---

## 🎨 Customization Quick Links

- **Change colors**: Edit color class names in Chatbot components
- **Change size**: Edit dimensions in ChatWindow.tsx
- **Change personality**: Edit systemPrompt in chat.ts
- **Change greeting**: Edit welcome message in ChatWindow.tsx

See `CHATBOT_CUSTOMIZATION.md` for detailed options.

---

## 🚀 How It Works

```
1. User types message → Chatbot component captures it
2. Server action processes → Adds event context from DB
3. OpenAI API called → GPT-3.5 generates response
4. Response returned → Displayed in chat window
5. Auto-scroll → Latest message always visible
```

---

## ⚙️ Stack Used

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Next.js 16 Server Actions
- **AI**: OpenAI GPT-3.5 Turbo  
- **Database**: Prisma + SQLite (for event context)
- **Icons**: Lucide React

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Chatbot not visible | Restart server: `npm run dev` |
| "API key not working" | Check key in .env, verify on openai.com |
| "Generic responses" | Your database needs published events |
| "Slow responses" | Wait, OpenAI rate limits may apply |
| "Random crashes" | Check browser console for errors |

---

## 📊 Current Status

✅ Server running at http://localhost:3000
✅ All components loaded
✅ Ready to chat!
✅ No API key needed for testing (will show placeholder response)
✅ Add API key to enable real AI responses

---

## 🔒 Important Notes

- **Cost**: You pay per API call to OpenAI (usually $0.001-0.01 per message)
- **Free Tier**: OpenAI gives $5 free credits, then charges you
- **API Key**: Never commit to git, keep in .env
- **Rate Limits**: Free tier has message limits

---

## 📚 Full Documentation

- Setup instructions: `CHATBOT_SETUP.md`
- Customization guide: `CHATBOT_CUSTOMIZATION.md`
- API options: See both files

---

## 🎓 Learning Resources

- OpenAI Docs: https://platform.openai.com/docs
- System Prompts Guide: https://platform.openai.com/docs/guides/prompt-engineering
- Next.js: https://nextjs.org/docs

---

## ✨ Cool Features

- 🎨 Modern gradient UI
- ⚡ Real-time responses
- 📱 Mobile responsive
- 🌙 Dark mode support
- ♿ Accessible design
- 🎯 Event-aware AI
- 💬 Smart assistant tone

---

## 🚀 Next Level

Want to enhance? Check the "Next Steps" section in CHATBOT_SETUP.md:
- Add chat history
- Enable event booking via chat
- Add sentiment analysis
- Support multiple languages
- Add voice chat

---

**Questions?** Check the documentation files or logs at:
- Browser Console: F12 → Console tab
- Server Logs: Terminal where `npm run dev` is running

**Happy Chatting!** 🎉
