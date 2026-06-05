import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import CreateBoardForm from "@/components/CreateBoardForm";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  noStore();
  const session = await getServerSession(
    authOptions
  );
  if (!session) {
    redirect("/signin");
  }
  const boards = await prisma.board.findMany({
    where: {
      userId: session.user.id,
    },
  });


  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-['Sora',sans-serif]">
      {/* Header */}
      <div className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-violet-500/30">
            B
          </div>
          <span className="text-sm font-semibold tracking-wide text-white/80">
            BoardSpace
          </span>
        </div>
        <span className="text-xs text-white/30 tabular-nums">
          {boards.length} board{boards.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-14">
        {/* Hero heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tight leading-none mb-3 bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Your Boards
          </h1>
          <p className="text-white/40 text-sm">
            Organise your work, one board at a time.
          </p>
        </div>

        {/* Board grid */}
        {boards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-white/20 text-sm">
            No boards yet — create your first one below.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {boards.map((board, i) => (
              <Link key={board.id} href={`/boards/${board.id}`}>
                <div
                  className="group relative rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-violet-500/40 transition-all duration-300 p-6 cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />

                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 mb-4 flex items-center justify-center text-violet-400 text-xs font-bold">
                    {board.title.charAt(0).toUpperCase()}
                  </div>

                  <h2 className="font-semibold text-white/90 text-base leading-tight group-hover:text-white transition-colors">
                    {board.title}
                  </h2>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-white/30 group-hover:text-violet-400/60 transition-colors">
                    <span>Open board</span>
                    <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Create form section */}
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
            New Board
          </h2>
          <CreateBoardForm />

        </div>
      </div>
    </main>
  );
}
