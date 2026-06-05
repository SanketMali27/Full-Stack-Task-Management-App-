"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const result = await signIn(
            "credentials",
            {
                email,
                password,
                redirect: false,
            }
        );

        if (result?.error) {
            setMessage("Invalid credentials");
            return;
        }

        setMessage("Login successful");
        redirect("/"); // Redirect to home page after successful login
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button type="submit">
                Login
            </button>
            <Link href="/signup">
                Don't have an account? Sign up
            </Link>

            <p>{message}</p>
        </form>
    );
}