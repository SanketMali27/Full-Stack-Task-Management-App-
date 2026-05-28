"use client";

type CounterProps = {
    count: number;
    increase: () => void;
};

export default function Counter({
    count,
    increase,
}: CounterProps) {
    return (
        <div>
            <h1>Count: {count}</h1>

            <button onClick={increase}>
                Increase
            </button>
        </div>
    );
}