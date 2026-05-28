'use client';
import Image from "next/image";
import { useState } from "react";

import Counter from "@/components/Counter";
export default function Home() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={1000}
          height={200}
          priority
        />
        <Counter
          count={count}
          increase={increase}
        />


      </main>
    </div>
  );
}
