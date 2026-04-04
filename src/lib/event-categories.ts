/** Client-side category inference from text — no backend field required. */
export const EVENT_CATEGORY_OPTIONS = [
  { id: "all", label: "All" },
  { id: "academic", label: "Academic" },
  { id: "social", label: "Social" },
  { id: "sports", label: "Sports" },
  { id: "career", label: "Career" },
  { id: "campus", label: "Campus life" },
] as const;

export type EventCategoryId = (typeof EVENT_CATEGORY_OPTIONS)[number]["id"];

export function inferEventCategory(title: string, description: string, venue: string): Exclude<EventCategoryId, "all"> {
  const t = `${title} ${description} ${venue}`.toLowerCase();
  if (/workshop|lecture|seminar|academic|study|research|lab|class|course|exam/.test(t)) return "academic";
  if (/sport|fitness|run|match|tournament|gym|basketball|soccer|football/.test(t)) return "sports";
  if (/career|job|recruit|intern|networking|employer|resume/.test(t)) return "career";
  if (/party|mixer|social|dance|concert|music|celebration|welcome/.test(t)) return "social";
  return "campus";
}
