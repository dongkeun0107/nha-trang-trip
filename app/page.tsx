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
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* 상단 정보 */}
        <div>
          <h1 className="text-2xl font-bold">{tripInfo.title}</h1>
          <p>{tripInfo.dates}</p>
          <p>{tripInfo.place}</p>
          <p>{tripInfo.hotel}</p>
        </div>

        {/* 🔥 일정 선택 영역 (여기에 id 추가됨) */}
        <section
          id="schedule-menu"
          className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-slate-100"
        >
          <h2 className="text-xl font-bold mb-3">일정 선택</h2>
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
          className="w-full rounded border px-3 py-2"
          placeholder="찾을 내용을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 일정 리스트 */}
        {filteredDays.map((day, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-4 shadow-md"
          >
            <h3 className="text-lg font-bold">
              {day.day} - {day.date}
            </h3>
            <p className="text-sm text-gray-500">{day.theme}</p>
            <p className="text-sm">{day.highlight}</p>

            <button
              className="mt-2 text-blue-500"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {openIndex === index ? "닫기 ▲" : "보기 ▼"}
            </button>

            {openIndex === index && (
              <ul className="mt-3 space-y-1">
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

      {/* 🔥 일정 이동 버튼 (추가된 부분) */}
      <button
        onClick={() => {
          const el = document.getElementById("schedule-menu");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-sky-600 px-6 py-4 text-lg font-bold text-white shadow-lg"
      >
        일정 보기
      </button>
    </main>
  );
}
