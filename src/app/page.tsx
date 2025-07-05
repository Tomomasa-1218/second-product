'use client';

import { useState } from "react";
import { FiPlay, FiClock } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Task 型
interface Task {
  name: string;
  start: Date;
}

export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleStart = () => {
    const trimmed = taskName.trim();
    if (trimmed === "") return;
    const newTask = { name: trimmed, start: new Date() };
    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
    toast.success(`「${trimmed}」を開始しました`);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg">
        <h1 className="text-center text-3xl font-extrabold text-white drop-shadow-sm">
          竹次タスク管理ページ
        </h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left: Input */}
        <section className="w-full md:w-1/3 flex flex-col items-center md:items-stretch justify-start gap-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="タスク名を入力"
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black dark:text-white dark:bg-zinc-800"
          />
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold py-2 rounded shadow active:scale-[.98]"
          >
            <FiPlay /> 開始
          </button>
        </section>

        {/* Right: Task list */}
        <section className="flex-1 max-h-[70vh] overflow-y-auto space-y-4 pr-1">
          {tasks.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">開始されたタスクはありません。</p>
          ) : (
            tasks.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-zinc-800 shadow rounded flex justify-between items-center hover:bg-indigo-50 dark:hover:bg-zinc-700 transition"
              >
                <span className="font-medium break-all">{t.name}</span>
                <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300">
                  <FiClock /> {formatTime(t.start)}
                </span>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Toast */}
      <Toaster
        toastOptions={{
          className: "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700",
        }}
      />
    </div>
  );
}
