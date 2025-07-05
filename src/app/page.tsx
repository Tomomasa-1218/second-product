'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);

  // Load txt file once on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data.txt");
        const text = await res.text();
        const arr = text.split(/\r?\n/).filter((l) => l.trim() !== "");
        setLines(arr);
      } catch (err) {
        console.error("データの読み込みに失敗しました", err);
      }
    };
    loadData();
  }, []);

  // Filter whenever keyword or lines change
  useEffect(() => {
    if (keyword === "") {
      setFiltered([]);
      return;
    }
    const lower = keyword.toLowerCase();
    const result = lines.filter((l) => l.toLowerCase().includes(lower));
    setFiltered(result);
  }, [keyword, lines]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">キーワード検索デモ</h1>
      <div className="w-full max-w-4xl flex gap-6">
        {/* Left: input */}
        <div className="w-1/3">
          <label className="block mb-2 text-sm font-medium" htmlFor="keyword-input">
            キーワードを入力
          </label>
          <input
            id="keyword-input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="例: apple"
          />
        </div>
        {/* Right: results */}
        <div className="flex-1 border border-gray-300 rounded p-4 min-h-[200px] overflow-y-auto">
          {keyword === "" ? (
            <p className="text-gray-500">左側にキーワードを入力してください。</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">該当する行がありません。</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {filtered.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
