import { prisma } from "@/lib/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const existing = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!existing) {
    return new Response("Todo not found", { status: 404 });
  }

  await prisma.todo.delete({
    where: { id: parseInt(params.id) },
  });

  return new Response(null, { status: 204 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await req.json();

  const todo = await prisma.todo.update({
    where: { id },
    data: {
      completed: body.completed,
    },
  });

  return Response.json(todo);
}
