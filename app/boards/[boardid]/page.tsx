import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CreateTaskForm from "@/components/CreateTaskForm";

type BoardPageProps = {
    params: Promise<{ boardId: string }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
    const { boardId } = await params;

    if (!boardId) notFound();

    const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: { tasks: true },
    });

    if (!board) notFound();

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white font-['Sora',sans-serif]">
            {/* Header */}
            <div className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-violet-500/30">
                        {board.title.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-white/80">
                        {board.title}
                    </span>
                </div>
                <span className="text-xs text-white/30 tabular-nums">
                    {board.tasks.length} task{board.tasks.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-14">
                {/* Hero heading */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black tracking-tight leading-none mb-3 bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                        {board.title}
                    </h1>
                    <p className="text-white/40 text-sm">
                        Track and manage your tasks below.
                    </p>
                </div>

                {/* Task list */}
                {board.tasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-white/20 text-sm mb-14">
                        No tasks yet — create your first one below.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 mb-14">
                        {board.tasks.map((task, i) => (
                            <div
                                key={task.id}
                                className="group relative rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300 px-6 py-5 overflow-hidden"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-600/5 to-transparent pointer-events-none" />

                                <div className="flex items-start gap-4">
                                    {/* Status dot */}
                                    <div className="mt-1 w-2 h-2 rounded-full bg-violet-500/60 ring-2 ring-violet-500/20 shrink-0" />

                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-semibold text-white/90 text-base leading-tight group-hover:text-white transition-colors truncate">
                                            {task.title}
                                        </h2>
                                        {task.description && (
                                            <p className="mt-1.5 text-sm text-white/40 leading-relaxed line-clamp-2">
                                                {task.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Arrow */}
                                    <svg
                                        className="w-4 h-4 text-white/20 group-hover:text-violet-400/60 translate-x-0 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create task section */}
                <div className="border-t border-white/10 pt-10">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                        New Task
                    </h2>
                    <CreateTaskForm boardId={board.id} />
                </div>
            </div>
        </main>
    );
}