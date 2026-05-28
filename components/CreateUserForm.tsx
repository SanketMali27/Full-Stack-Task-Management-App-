"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    async function createUser() {
        await fetch("/api/users", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                email,
            }),
        });

        setName("");
        setEmail("");
        router.refresh();
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={createUser}>
                Create User
            </button>
        </div>
    );
}
