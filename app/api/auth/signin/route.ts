import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type SignInRequestBody = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, password } = body as SignInRequestBody;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return Response.json(
                { error: "Invalid credentials" },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return Response.json(
                { error: "Invalid credentials" },
                { status: 400 }
            );
        }

        return Response.json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}