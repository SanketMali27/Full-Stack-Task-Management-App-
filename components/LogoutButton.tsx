"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="
    w-full rounded-xl
    bg-red-500/10
    border border-red-500/20
    px-4 py-3
    text-red-400
    font-medium
    hover:bg-red-500/20
    transition
    "
            onClick={() =>
                signOut({
                    callbackUrl: "/signin",
                })
            }
        >
            Logout
        </button>

    );
}