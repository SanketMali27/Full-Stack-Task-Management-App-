import { prisma } from "@/lib/prisma";

export async function GET() {
    const tasks = await prisma.task.findMany({
        include: {
            board: true,
        },
    });

    return Response.json(tasks);
}

export async function POST(request: Request) {
    const body = await request.json();

    const task = await prisma.task.create({
        data: {
            title: body.title,
            description: body.description,
            boardId: body.boardId,
        },
    });

    return Response.json(task);
}