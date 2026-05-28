"use client";

export default function TestPage() {
    async function createTask() {
        const response = await fetch("/api/tasks", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                title: "Learn Next.js",

                description: "Understand App Router deeply",

                boardId: "cmppfs6un000314md9e9vqcmm",
            }),
        });

        const data = await response.json();

        console.log(data);
    }

    return (
        <button onClick={createTask}>
            Create Task
        </button>
    );
}