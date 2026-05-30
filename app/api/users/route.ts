import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
        },
    });

    return Response.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    const email =
        typeof body.email === "string" ? body.email.trim() : "";
    const password =
        typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
        return Response.json(
            { error: "Email and password are required." },
            { status: 400 }
        );
    }

    const user = await prisma.user.create({
        data: {
            email,
            name: typeof body.name === "string" ? body.name.trim() : null,
            password: await bcrypt.hash(password, 10),
        },
    });

    return Response.json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    });
}
