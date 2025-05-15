import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const completed = searchParams.get("completed");

  const todos = await prisma.todo.findMany({
    where: completed !== null ? { completed: completed === "true" } : undefined,
  });

  return Response.json(todos);
}
export async function POST(req: Request) {
  const body = await req.json();
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      dueDate: new Date(body.dueDate),
      priority: body.priority,
      completed: false,
    },
  });
  return Response.json(todo);
}
