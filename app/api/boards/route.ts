import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const boards = await prisma.board.findMany();

    return Response.json(boards);
}
export async function POST(request: Request) {
    const body = await request.json();

    const title =
        typeof body.title === "string"
            ? body.title.trim()
            : "";

    if (!title) {
        return Response.json(
            { error: "Board title is required." },
            { status: 400 }
        );
    }

    const session = await getServerSession(
        authOptions
    );

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const board = await prisma.board.create({
        data: {
            title,
            userId: session.user.id,
        },
    });

    return Response.json(board);
}
