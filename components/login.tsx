"use client";

import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setMessage("All fields are required");
            return;
        }
        const response = await fetch(
            "/api/auth/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            setMessage("Login successful");
            setEmail("");
            setPassword("");
            localStorage.setItem("user", JSON.stringify(data));
            console.log(data);
        } else {
            setMessage(data.error);
        }
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

            <p>{message}</p>
        </form>
    );
}