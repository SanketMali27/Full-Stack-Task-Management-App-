"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
export async function createBoard(
    formData: FormData
) {
    try {
        const title =
            formData.get("title")?.toString().trim() ?? "";

        if (!title) {
            return {
                success: false,
                message: "Title is required",
            };
        }

        const session =
            await getServerSession(authOptions);

        if (!session) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const board =
            await prisma.board.create({
                data: {
                    title,
                    userId: session.user.id,
                },
            });
        revalidatePath("/");
        return {
            success: true,
            message: "Board created",
            board,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Failed to create board",
        };
    }
}