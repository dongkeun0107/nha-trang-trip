"use client";

import { useState } from "react";

const tripInfo = {
  title: "나트랑 가족여행 안내",
  dates: "2026년 5월 6일(수) ~ 5월 9일(토)",
  place: "베트남 나트랑",
  hotel: "나트랑 메리어트 리조트 & 스파, 혼트레 아일랜드",
};

const days = [
  {
    id: "day1",
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
    id: "day2",
    day: "2일차",
    date: "5월 7일 목요일",
    theme: "자유시간",
    highlight: "",
    items: [],
  },
  {
    id: "day3",
    day: "3일차",
    date: "5월 8일 금요일",
    theme: "관광",
    highlight: "",
    items: [],
  },
  {
    id: "day4",
    day: "4일차",
    date: "5월 9일 토요일",
    theme: "귀국",
    highlight: "",
    items: [],
  },
];

export default function Page() {
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const toggleDay = (id: string) => {
    setOpenDay(openDay === id ? null : id);
  };

  const scrollToSchedule = () => {
    const el = document.getElementById("schedule-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* 상단 정보 */}
        <h1 className="text-2xl font-bold">{tripInfo.title}</h1>
        <p className="mt-2">{tripInfo.dates}</p>
        <p>{tripInfo.place}</p>
        <p className="mb-6">{tripInfo.hotel}</p>

        {/* 일정 선택 (여기로 이동됨) */}
        <div
          id="schedule-section"
          className="bg-white rounded-2xl shadow p-4 mb-4"
        >
          <h2 className="font-bold mb-3">일정 선택</h2>

          <div className="grid grid-cols-2 gap-3">
            {days.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  const el = document.getElementById(d.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-500 text-white py-2 rounded-lg"
              >
                {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* 검색 */}
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="찾을 내용을 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 일정 카드 */}
        {days.map((d) => (
          <div
            key={d.id}
            id={d.id}
            className="bg-white rounded-xl shadow p-4 mb-4"
          >
            <h3 className="font-bold text-lg">
              {d.day} - {d.date}
            </h3>
            <p className="text-sm text-gray-600">{d.theme}</p>
            {d.highlight && (
              <p className="text-sm mt-1">{d.highlight}</p>
            )}

            <button
              onClick={() => toggleDay(d.id)}
              className="text-blue-500 mt-2"
            >
              {openDay === d.id ? "닫기 ▲" : "보기 ▼"}
            </button>

            {openDay === d.id && (
              <div className="mt-3 space-y-1">
                {d.items.map((item, i) => (
                  <div key={i}>
                    {item.time} - {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ⭐ 핵심: 일정 보기 버튼 (기존 UI 유지 + 기능만 추가) */}
      <button
        onClick={scrollToSchedule}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        일정 보기
      </button>
    </div>
  );
}
