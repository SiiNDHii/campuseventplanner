export const ROLES = {
  ADMIN: "ADMIN",
  ORGANIZER: "ORGANIZER",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const TASK_STATUS = { PENDING: "PENDING", DONE: "DONE" } as const;

export const INCIDENT_CATEGORIES = [
  { value: "LATE_START", label: "Late start" },
  { value: "POOR_MANAGEMENT", label: "Poor management" },
  { value: "VENUE_ISSUE", label: "Venue issues" },
  { value: "OTHER", label: "Other" },
] as const;

export const SESSION_COOKIE = "cep_session";
