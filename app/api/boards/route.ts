import { prisma } from "@/lib/prisma";

export async function GET() {
    const boards = await prisma.board.findMany();

    return Response.json(boards);
}

export async function POST(request: Request) {
    const body = await request.json();

    const board = await prisma.board.create({
        data: {
            title: body.title,

            userId: body.userId,
        },
    });

    return Response.json(board);
}