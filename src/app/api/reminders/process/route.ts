import { NextResponse } from "next/server";
import { processEventReminders } from "@/lib/reminders";

/** Call from cron (e.g. every 15m) or manually for demos. */
export async function POST() {
  try {
    const result = await processEventReminders();
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to process reminders" }, { status: 500 });
  }
}
