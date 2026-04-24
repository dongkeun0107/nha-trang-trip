"use client";

import React, { useMemo, useState } from "react";

const tripInfo = {
  title: "나트랑 가족여행 안내",
  dates: "2026년 5월 6일(수) ~ 5월 9일(토)",
  place: "베트남 나트랑",
  hotel: "나트랑 메리어트 리조트 & 스파, 혼트레 아일랜드",
};

const days = [
  {
    day: "1일차",
    date: "5월 6일 수요일",
    theme: "출국 · 호텔 이동 · 휴식",
    highlight: "인천공항 집합 후 나트랑 도착",
    items: [
      { time: "05:00", title: "인천공항 집합" },
      { time: "06:50", title: "출국" },
      { time: "09:40", title: "나트랑 도착" },
      { time: "12:30", title: "호텔 체크인" },
      { time: "18:30", title: "저녁식사" },
    ],
  },
  {
    day: "2일차",
    date: "5월 7일 목요일",
    theme: "자유시간",
    highlight: "리조트 휴식",
    items: [
      { time: "08:30", title: "아침식사" },
      { time: "10:00", title: "자유시간" },
      { time: "15:00", title: "마사지" },
      { time: "18:00", title: "저녁식사" },
    ],
  },
  {
    day: "3일차",
    date: "5월 8일 금요일",
    theme: "시내투어",
    highlight: "포나가르, 롯데마트",
    items: [
      { time: "08:30", title: "아침식사" },
      { time: "10:30", title: "시내투어" },
      { time: "16:00", title: "복귀" },
      { time: "18:00", title: "BBQ" },
    ],
  },
  {
    day: "4일차",
    date: "5월 9일 토요일",
    theme: "귀국",
    highlight: "공항 이동",
    items: [
      { time: "08:30", title: "아침식사" },
      { time: "11:00", title: "체크아웃" },
      { time: "19:00", title: "공항 이동" },
      { time: "21:35", title: "출국" },
    ],
  },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filteredDays = useMemo(() => {
    if (!query) return days;

    return days.map((day) => ({
      ...day,
      items: day.items.filter((item) =>
        `${item.title}`.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900">

      {/* 🔥 일정 이동 버튼 */}
      <button
        onClick={() => {
          const el = document.getElementById("schedule-menu");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-sky-600 px-5 py-4 text-lg font-black text-white shadow-lg"
      >
        일정 보기
      </button>

      <div className="mx-auto max-w-3xl space-y-6">

        {/* 상단 */}
        <div>
          <h1 className="text-2xl font-bold">{tripInfo.title}</h1>
          <p>{tripInfo.dates}</p>
          <p>{tripInfo.place}</p>
          <p>{tripInfo.hotel}</p>
        </div>

        {/* 🔥 여기가 이동 목표 */}
        <section id="schedule-menu">
          <h2 className="text-xl font-bold mb-2">일정 선택</h2>
          <div className="grid grid-cols-2 gap-2">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setOpenIndex(idx)}
                className="bg-blue-500 text-white py-2 rounded"
              >
                {day.day}
              </button>
            ))}
          </div>
        </section>

        {/* 검색 */}
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 일정 리스트 */}
        {filteredDays.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{day.day} - {day.date}</h3>
            <p>{day.theme}</p>

            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="text-blue-500 mt-2"
            >
              {openIndex === index ? "닫기 ▲" : "보기 ▼"}
            </button>

            {openIndex === index && (
              <ul className="mt-2">
                {day.items.map((item, i) => (
                  <li key={i}>
                    {item.time} - {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
