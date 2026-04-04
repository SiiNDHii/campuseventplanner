import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@campus.edu" },
    update: { passwordHash: password },
    create: {
      email: "admin@campus.edu",
      passwordHash: password,
      name: "Campus Admin",
      role: "ADMIN",
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@campus.edu" },
    update: { passwordHash: password },
    create: {
      email: "organizer@campus.edu",
      passwordHash: password,
      name: "Alex Organizer",
      role: "ORGANIZER",
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@campus.edu" },
    update: { passwordHash: password },
    create: {
      email: "student@campus.edu",
      passwordHash: password,
      name: "Sam Student",
      role: "STUDENT",
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "student2@campus.edu" },
    update: { passwordHash: password },
    create: {
      email: "student2@campus.edu",
      passwordHash: password,
      name: "Jordan Lee",
      role: "STUDENT",
    },
  });

  const starts = new Date();
  starts.setDate(starts.getDate() + 3);
  starts.setHours(14, 0, 0, 0);

  const event = await prisma.event.upsert({
    where: { id: "seed-event-welcome" },
    update: {},
    create: {
      id: "seed-event-welcome",
      title: "Welcome Week Mixer",
      description: "Meet clubs, grab snacks, and plan your semester.",
      venue: "Student Union Hall A",
      startsAt: starts,
      published: true,
      organizerId: organizer.id,
    },
  });

  await prisma.registration.upsert({
    where: {
      userId_eventId: { userId: student.id, eventId: event.id },
    },
    update: {},
    create: { userId: student.id, eventId: event.id },
  });

  await prisma.task.upsert({
    where: { id: "seed-task-setup" },
    update: {},
    create: {
      id: "seed-task-setup",
      eventId: event.id,
      name: "Arrange seating and signage",
      assignedToId: student2.id,
      createdById: organizer.id,
      deadline: new Date(starts.getTime() - 24 * 60 * 60 * 1000),
      status: "PENDING",
    },
  });

  console.log("Seeded users: admin@campus.edu, organizer@campus.edu, student@campus.edu (password: password123)");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
