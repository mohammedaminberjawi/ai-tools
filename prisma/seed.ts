import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany(); // Clear existing data
  await prisma.category.deleteMany(); // Clear existing data

  const work = await prisma.category.create({ data: { name: "Work" } });
  const personal = await prisma.category.create({ data: { name: "Personal" } });

  await prisma.todo.createMany({
    data: [
      {
        title: "Write presentation outline",
        description: "Map out the AI tools demo sequence",
        dueDate: new Date("2025-05-20"),
        priority: "high",
        completed: false,
        categoryId: work.id,
      },
      {
        title: "Setup Postman collection",
        description: "Prepare endpoints for Postbot demo",
        dueDate: new Date("2025-05-18"),
        priority: "medium",
        completed: true,
        categoryId: work.id,
      },
      {
        title: "Buy dog food",
        description: "And maybe treats too",
        dueDate: new Date("2025-05-17"),
        priority: "low",
        completed: false,
        categoryId: personal.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed data created.");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
