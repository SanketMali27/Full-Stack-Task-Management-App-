import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    const boards = await prisma.board.findMany();

    return Response.json(boards);
}

export async function POST(request: Request) {
    const body = await request.json();
    const title =
        typeof body.title === "string" ? body.title.trim() : "";

    if (!title) {
        return Response.json(
            { error: "Board title is required." },
            { status: 400 }
        );
    }

    const requestedUserId =
        typeof body.userId === "string" && body.userId.trim()
            ? body.userId.trim()
            : undefined;

    const existingUser = requestedUserId
        ? await prisma.user.findUnique({ where: { id: requestedUserId } })
        : await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

    const user =
        existingUser ??
        (await prisma.user.upsert({
            where: { email: "demo@boardspace.local" },
            update: {},
            create: {
                email: "demo@boardspace.local",
                name: "Demo User",
                password: await bcrypt.hash("demo-boardspace-password", 10),
            },
        }));

    const board = await prisma.board.create({
        data: {
            title,
            userId: user.id,
        },
    });

    return Response.json(board);
}
