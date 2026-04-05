"use server";

import { OpenAI } from "openai";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EventContext {
  id: string;
  title: string;
  startsAt: Date;
  venue: string;
  description: string;
}

async function getEventContext(): Promise<EventContext[]> {
  try {
    const events = await prisma.event.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        startsAt: true,
        venue: true,
        description: true,
      },
      take: 10,
      orderBy: { startsAt: "asc" },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// Fallback responses for demo/testing without real OpenAI key
function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes("event")) {
    return "Campus events provide great opportunities to connect with peers and learn new things! Check our Events page to see all upcoming events. You can filter by category and register for any event that interests you.";
  }
  
  if (message.includes("register") || message.includes("attend")) {
    return "To register for an event: 1) Go to the Events page, 2) Find the event you like, 3) Click 'Register', 4) Complete the registration form. After the event, you can mark it as attended!";
  }
  
  if (message.includes("login") || message.includes("sign in")) {
    return "Go to the Login page to sign in with your campus email. If you don't have an account yet, click 'Register' to create one with your email and password.";
  }
  
  if (message.includes("qr") || message.includes("scan")) {
    return "Event organizers can generate a QR code for attendance tracking. Students can scan the code after attending the event to mark their attendance. This helps keep track of who participated in each event!";
  }
  
  if (message.includes("attendance") || message.includes("attended")) {
    return "You can mark an event as attended on the event details page after it has ended. Go to your registered event, and you'll see a 'Mark as Attended' button. Your attendance will appear on your 'My Events' page.";
  }
  
  return "I'm your Campus Event Assistant! I can help you with: finding events, registering for events, learning about attendance tracking, and answering questions about the campus event platform. What would you like to know?";
}

export async function sendChatMessage(userMessage: string): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Check for invalid placeholder key
    if (!apiKey || apiKey === "jahanzaibkhan786" || !apiKey.startsWith("sk-")) {
      console.warn("Invalid OpenAI API key detected. Using demo responses.");
      return getFallbackResponse(userMessage);
    }

    const events = await getEventContext();

    const eventInfo = events
      .map(
        (e) =>
          `- ${e.title}: ${new Date(e.startsAt).toLocaleString()} at ${e.venue}`
      )
      .join("\n");

    const systemPrompt = `You are a friendly and helpful Campus Event Planner Assistant for a university. Your role is to help students with:
1. Finding and learning about campus events
2. Event registration and attendance
3. General campus information and guidance

Available campus events:
${eventInfo || "No upcoming events at the moment"}

Guidelines:
- Be friendly and conversational
- Keep responses concise (2-3 sentences)
- Ask follow-up questions if needed
- For event details, provide specific dates, times, and venues
- Guide users on how to register if they ask
- Suggest relevant events based on their interests
- If asked about events not in the list, politely explain they're not in current schedule`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botMessage =
      response.choices[0]?.message?.content || "Sorry, I couldn't process that request.";
    return botMessage;
  } catch (error) {
    console.error("Chat error:", error);
    
    // If OpenAI fails, try fallback response
    try {
      return getFallbackResponse(userMessage);
    } catch {
      return "I'm having trouble processing your request right now. Please try asking about: events, registration, login, QR codes, or attendance tracking.";
    }
  }
}
