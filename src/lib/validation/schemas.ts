import { z } from "zod";

/** Prisma-style ids (cuid) and legacy seed ids like `seed-event-welcome`. */
export const entityIdSchema = z
  .string()
  .min(1, "Invalid reference.")
  .max(64)
  .regex(/^[a-zA-Z0-9_-]+$/, "Invalid reference.");

export const userIdSchema = z
  .string()
  .min(20)
  .max(32)
  .regex(/^c[a-z0-9]+$/i, "Invalid user reference.");

const taskStatusSchema = z.enum(["PENDING", "DONE"]);

/** Open redirects: only same-origin paths, single leading slash. */
export function safeInternalPath(next: string): string {
  const path = next.trim().split("?")[0] ?? "/";
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  if (path.includes("\0") || path.includes("\\")) return "/";
  return path;
}

export const signInFormSchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.email("Enter a valid email address.")
  ),
  password: z.string().min(1, "Password is required."),
  next: z.string().optional(),
});

export const signUpFormSchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.email("Enter a valid email address.")
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password is too long (max 72 characters).")
    .regex(/[A-Za-z]/, "Password must include at least one letter.")
    .regex(/[0-9]/, "Password must include at least one number."),
  name: z
    .string()
    .trim()
    .max(120, "Name is too long.")
    .optional()
    .transform((s) => (s && s.length > 0 ? s : undefined)),
});

export const eventFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200, "Title is too long."),
  description: z.string().trim().max(8000).optional().default(""),
  venue: z.string().trim().min(1, "Venue is required.").max(300, "Venue is too long."),
  startsAt: z.string().min(1, "Date and time are required."),
  published: z.boolean(),
});

export type ParsedEventForm = z.infer<typeof eventFormSchema> & { startsAtDate: Date };

export function parseEventFormData(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    venue: formData.get("venue"),
    startsAt: formData.get("startsAt"),
    published: formData.get("published") === "on",
  };
  const result = eventFormSchema.safeParse(raw);
  if (!result.success) {
    return { success: false as const, error: result.error.issues[0]?.message ?? "Invalid event data." };
  }
  const startsAtDate = new Date(result.data.startsAt);
  if (Number.isNaN(startsAtDate.getTime())) {
    return { success: false as const, error: "That date and time is not valid." };
  }
  return { success: true as const, data: { ...result.data, startsAtDate } };
}

export const announcementMessageSchema = z
  .string()
  .trim()
  .min(1, "Please enter a message.")
  .max(4000, "Message is too long.");

export const feedbackFormSchema = z.object({
  ratingOrganization: z.coerce.number().int().min(1).max(5),
  ratingVenue: z.coerce.number().int().min(1).max(5),
  ratingTiming: z.coerce.number().int().min(1).max(5),
  ratingExperience: z.coerce.number().int().min(1).max(5),
  comment: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((s) => (s && s.length > 0 ? s : null)),
});

export const incidentFormSchema = z.object({
  category: z.enum(["LATE_START", "POOR_MANAGEMENT", "VENUE_ISSUE", "OTHER"]),
  description: z
    .string()
    .trim()
    .min(10, "Please add at least 10 characters describing the issue.")
    .max(4000, "Description is too long."),
  anonymous: z.boolean(),
});

export const taskFormSchema = z.object({
  name: z.string().trim().min(1, "Task name is required.").max(200),
  assignedToId: userIdSchema,
  deadline: z.string().min(1, "Deadline is required."),
});

export function parseTaskFormData(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    assignedToId: formData.get("assignedToId"),
    deadline: formData.get("deadline"),
  };
  const result = taskFormSchema.safeParse(raw);
  if (!result.success) {
    return { success: false as const, error: result.error.issues[0]?.message ?? "Invalid task data." };
  }
  const deadline = new Date(result.data.deadline);
  if (Number.isNaN(deadline.getTime())) {
    return { success: false as const, error: "That deadline is not a valid date." };
  }
  return { success: true as const, data: { ...result.data, deadline } };
}

export { taskStatusSchema };
