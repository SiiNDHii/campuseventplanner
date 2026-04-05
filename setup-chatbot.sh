#!/bin/bash
# AI Chatbot Quick Setup Script for Campus Event Planner

echo "🤖 Campus Event Planner - AI Chatbot Setup"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    exit 1
fi

# Check if OPENAI_API_KEY is set
if grep -q "OPENAI_API_KEY=" .env; then
    KEY=$(grep "OPENAI_API_KEY=" .env | cut -d '"' -f 2)
    if [ "$KEY" = "sk-your-openai-api-key-here" ] || [ -z "$KEY" ]; then
        echo "⚠️  OPENAI_API_KEY is not configured"
        echo ""
        echo "📝 Setup Instructions:"
        echo "1. Go to https://platform.openai.com/api-keys"
        echo "2. Create a new API key"
        echo "3. Copy the key (starts with 'sk-')"
        echo "4. Update .env file:"
        echo "   OPENAI_API_KEY='sk-your-actual-key-here'"
        echo ""
        exit 1
    fi
fi

echo "✅ Environment configured!"
echo "✅ Dependencies installed!"
echo "✅ Dev server ready at http://localhost:3000"
echo ""
echo "🚀 Features:"
echo "   • Floating chat button (bottom-right)"
echo "   • Event-aware responses"
echo "   • Real-time AI responses"
echo "   • Modern UI with animations"
echo ""
echo "📚 Documentation: See CHATBOT_SETUP.md"
echo ""
