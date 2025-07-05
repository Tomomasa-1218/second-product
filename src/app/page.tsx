'use client';

import { useState } from "react";

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
    setTasks((prev) => [...prev, { name: trimmed, start: new Date() }]);
    setTaskName("");
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* タイトル */}
      <h1 className="text-3xl font-bold text-center mb-8">竹次タスク管理ページ</h1>

      <div className="flex flex-1 gap-6">
        {/* 左: 入力欄 */}
        <div className="w-1/3 flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="タスク名を入力"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            開始
          </button>
        </div>

        {/* 右: タスク一覧 */}
        <div className="flex-1 border border-gray-300 rounded p-4 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500">開始されたタスクはありません。</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{t.name}</span>
                  <span className="text-sm text-gray-600">{formatTime(t.start)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
