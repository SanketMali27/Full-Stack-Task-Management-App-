"use client";
import { useState } from "react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage("All fields are required");
            return;
        }
        if (password.length <= 7) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        const response = await fetch(
            "/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            setMessage("Signup successful");
            console.log(data);
        } else {
            setMessage(data.error);
        }
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)

                }
            />

            <button className="bg-white hover:bg-silver-600 text-black font-semibold py-2 px-4 rounded transition-colors " type="submit">
                Signup
            </button>

            <p>{message}</p>
        </form>
    );
}