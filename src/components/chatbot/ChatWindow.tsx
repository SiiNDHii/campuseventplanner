"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader } from "lucide-react";
import { sendChatMessage } from "@/app/actions/chat";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! 👋 I'm your Campus Event Assistant. How can I help you today? You can ask me about events, registration, or campus activities!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await sendChatMessage(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--card)]/80 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div>
          <h2 className="font-semibold text-white">Campus Assistant</h2>
          <p className="text-xs text-pink-100">Always here to help</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.sender === "user"
                  ? "bg-violet-500 text-white rounded-br-none"
                  : "bg-[var(--muted)]/60 text-[var(--foreground)] rounded-bl-none border border-[var(--border)]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--muted)]/60 text-[var(--foreground)] rounded-2xl rounded-bl-none border border-[var(--border)] px-4 py-3 flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin text-violet-500" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-[var(--border)] bg-[var(--card)]/50 px-4 py-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            disabled={isLoading}
            className="flex-1 rounded-full bg-[var(--muted)]/30 px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] transition-colors focus:outline-none focus:border-violet-500 focus:bg-[var(--muted)]/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white transition-all hover:shadow-lg disabled:opacity-50 active:scale-95"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </Card>
  );
}
