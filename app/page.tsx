"use client";
import { useMemo, useState } from "react";

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
    highlight: "인천공항 집합 후 나트랑 도착, 빈펄섬 숙소 체크인",
    items: [
      { time: "05:00", title: "인천공항 집합", note: "베트남항공 VN441", icon: "✈️" },
      { time: "06:50 ~ 09:40", title: "인천공항 출발 → 나트랑 도착", note: "비행시간 약 5시간", icon: "✈️" },
      { time: "09:40", title: "깜란국제공항 도착", note: "패스트트랙 · ‘나트랑여행천사’ 피켓 확인", icon: "✅" },
      { time: "10:30", title: "픽업차량 탑승", note: "15인승 차량 2대 · 1터미널 2번 게이트", icon: "🚌" },
      { time: "11:30", title: "빈펄 선착장 도착", note: "투숙객 등록 및 대기", icon: "⛴️" },
      { time: "이후", title: "빈펄섬 이동", note: "보트 또는 케이블카 이용 · 약 15분", icon: "🚠" },
      { time: "12:30", title: "호텔 도착", note: "나트랑 메리어트 리조트 & 스파", icon: "🏨" },
      { time: "13:00", title: "점심식사", note: "WINDY 호텔 터키식 레스토랑", icon: "🍽️" },
      { time: "15:00 ~ 18:00", title: "자유시간", note: "휴식 및 리조트 이용", icon: "🌴" },
      { time: "18:30", title: "저녁식사", note: "SANDS 메인타워 · 저녁뷔페 18:00~21:00", icon: "🍽️" },
    ],
  },
  {
    day: "2일차",
    date: "5월 7일 목요일",
    theme: "리조트 휴식 · 사찰 · 마사지",
    highlight: "오전 자유시간, 오후 사찰과 빈펄하버 방문 후 마사지",
    items: [
      { time: "08:30", title: "아침식사", note: "SANDS 메인타워 · 아침뷔페 06:00~10:30", icon: "🍽️" },
      { time: "10:30 ~ 14:00", title: "자유시간", note: "리조트 휴식", icon: "🌴" },
      { time: "14:00", title: "사찰 & 빈펄하버", note: "Truc Lam 사찰, 빈펄하버", icon: "📷" },
      { time: "15:00", title: "마사지", note: "예약 일정 확인", icon: "💆" },
      { time: "18:00", title: "저녁식사", note: "SANDS 메인타워 · 저녁뷔페 18:00~21:00", icon: "🍽️" },
    ],
  },
  {
    day: "3일차",
    date: "5월 8일 금요일",
    theme: "나트랑 시내투어 · 빌라 BBQ",
    highlight: "포나가르사원, 롱선사, 혼총곶, 담시장, 롯데마트 방문",
    items: [
      { time: "08:30", title: "아침식사", note: "SANDS 메인타워 · 아침뷔페 06:00~10:30", icon: "🍽️" },
      { time: "10:30", title: "시내투어 집결", note: "케이블카 선착장 이동", icon: "👨‍👩‍👧‍👦" },
      { time: "11:10", title: "시내투어 시작", note: "포나가르사원 → 롱선사 → 혼총곶 → 담시장 → 롯데마트", icon: "📷" },
      { time: "16:00", title: "메리어트 선착장 복귀", note: "케이블카 또는 보트로 숙소 복귀", icon: "⛴️" },
      { time: "18:00", title: "저녁식사", note: "빌라 BBQ", icon: "🍖" },
    ],
  },
  {
    day: "4일차",
    date: "5월 9일 토요일",
    theme: "휴식 · 마사지 · 귀국",
    highlight: "마지막 자유시간 후 공항 이동, 밤 비행기로 귀국",
    items: [
      { time: "08:30", title: "아침식사", note: "SANDS 메인타워 · 아침뷔페 06:00~10:30", icon: "🍽️" },
      { time: "11:00 ~ 15:00", title: "자유시간", note: "리조트 이용 및 휴식", icon: "🌴" },
      { time: "14:00", title: "마사지", note: "예약 일정 확인", icon: "💆" },
      { time: "16:00", title: "짐정리", note: "개인 물품 확인", icon: "🧳" },
      { time: "18:00", title: "저녁식사", note: "SANDS 메인타워", icon: "🍽️" },
      { time: "19:00", title: "픽업차량 탑승", note: "15인승 차량 2대 · 로컬 예약", icon: "🚌" },
      { time: "20:00", title: "공항 도착", note: "베트남항공 VN440", icon: "✈️" },
      { time: "21:35 ~ 04:30", title: "나트랑 출발 → 인천공항 도착", note: "비행시간 약 5시간", icon: "✈️" },
    ],
  },
];

const quickNotes = [
  { icon: "✈️", title: "항공편", text: "출국 VN441 · 귀국 VN440" },
  { icon: "🏨", title: "숙소", text: "나트랑 메리어트 리조트 & 스파" },
  { icon: "🚌", title: "공항 이동", text: "15인승 차량 2대 예약" },
  { icon: "⛴️", title: "섬 이동", text: "보트 또는 케이블카 이용" },
];

const passportPeople = [
  { name: "김종민", type: "성인", eng: "KIM JONGMIN", passport: "M86951293", birth: "1945-11-12", expire: "2027-11-27", book: "EFZE92", departSeat: "35G" },
  { name: "배원옥", type: "성인", eng: "BAE WONOAK", passport: "M92155839", birth: "1947-10-20", expire: "2027-11-27", book: "EFZE92", departSeat: "35E" },
  { name: "배선옥", type: "성인", eng: "BAE SUNGOK", passport: "M954L0214", birth: "1952-07-21", expire: "2035-11-19", book: "FF3TKK", departSeat: "35C" },
  { name: "엄광현", type: "성인", eng: "EOM GWANGHYEON", passport: "M65213640", birth: "1957-09-16", expire: "2027-09-15", book: "FF3TKK", departSeat: "35A" },
  { name: "배광옥", type: "성인", eng: "BAE KWANGOCK", passport: "M24499401", birth: "1958-04-14", expire: "2028-01-15", book: "FF3TKK", departSeat: "35B" },
  { name: "박세훈", type: "성인", eng: "PARK SEHOON", passport: "M89910646", birth: "1966-03-13", expire: "2028-07-25", book: "ENFEHN", departSeat: "37G" },
  { name: "김수경", type: "성인", eng: "KIM SUKYONG", passport: "M85876055", birth: "1970-12-25", expire: "2027-03-21", book: "ENFEHN", departSeat: "37E" },
  { name: "김수미", type: "성인", eng: "KIM SUMI", passport: "M398K4943", birth: "1980-07-04", expire: "2035-12-02", book: "EFZE92", departSeat: "36D" },
  { name: "김수연", type: "성인", eng: "KIM SUYEON", passport: "M13314428", birth: "1972-08-18", expire: "2027-12-05", book: "DAAE9P", departSeat: "37D" },
  { name: "오희영", type: "성인", eng: "OH HEEYOUNG", passport: "M055F2595", birth: "1983-03-14", expire: "2035-09-23", book: "DF4USL", departSeat: "36C" },
  { name: "엄이슬", type: "성인", eng: "EOM YISEUL", passport: "M657U2384", birth: "1989-03-02", expire: "2032-12-28", book: "미정", departSeat: "36A" },
  { name: "김태련", type: "소아", eng: "KIM TAERYEON", passport: "M98576370", birth: "2015-02-09", expire: "2028-08-12", book: "EFZE92", departSeat: "36E" },
  { name: "김하련", type: "소아", eng: "KIM HARYEON", passport: "M29072173", birth: "2019-09-02", expire: "2028-08-12", book: "EFZE92", departSeat: "36G" },
  { name: "임유나", type: "소아", eng: "IM YUNA", passport: "M366T0107", birth: "2019-08-30", expire: "2030-09-23", book: "DAAE9P", departSeat: "36B" },
  { name: "김동근", type: "성인", eng: "KIM DONG KEUN", passport: "M183T7349", birth: "1983-07-30", expire: "미정", book: "미정", departSeat: "미정" },
];

function Header() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 p-6 shadow-sm md:p-10">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-base font-bold text-sky-700 shadow-sm">📅 {tripInfo.dates}</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">{tripInfo.title}</h1>
        <p className="mt-5 text-xl font-semibold leading-relaxed text-slate-700 md:text-2xl">{tripInfo.place}</p>
        <p className="mt-2 text-lg leading-relaxed text-slate-600 md:text-xl">📍 {tripInfo.hotel}</p>
      </div>
    </section>
  );
}

function QuickCards() {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      {quickNotes.map((card) => (
        <div key={card.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="text-4xl">{card.icon}</div>
          <h3 className="mt-3 text-xl font-extrabold text-slate-900">{card.title}</h3>
          <p className="mt-2 text-lg font-semibold leading-snug text-slate-600">{card.text}</p>
        </div>
      ))}
    </section>
  );
}

function TimelineItem({ item }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:p-5">
      <div className="flex gap-4">
        <div className="w-24 shrink-0 text-xl font-black text-sky-700 md:w-36 md:text-2xl">{item.time}</div>
        <div className="flex gap-4">
          <div className="text-3xl">{item.icon}</div>
          <div>
            <h4 className="text-2xl font-black leading-tight text-slate-900">{item.title}</h4>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-slate-600 md:text-xl">{item.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCard({ day, isOpen, onToggle }) {
  return (
    <section className="rounded-3xl bg-slate-50 p-4 shadow-sm md:p-6">
      <button type="button" onClick={onToggle} className="w-full rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100 active:scale-[0.99]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-black text-sky-700">{day.day}</p>
            <h2 className="mt-1 text-3xl font-black text-slate-900 md:text-4xl">{day.date}</h2>
            <p className="mt-3 text-xl font-extrabold text-slate-700">{day.theme}</p>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-slate-600">꼭 기억할 것: {day.highlight}</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-sky-600 px-4 py-3 text-lg font-black text-white">{isOpen ? "닫기 ▲" : "보기 ▼"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-5 space-y-3">
          {day.items.map((item, idx) => <TimelineItem key={day.day + idx} item={item} />)}
          <button type="button" onClick={onToggle} className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-xl font-black text-white shadow-sm active:scale-95">{day.day} 닫기</button>
        </div>
      )}
    </section>
  );
}

function CityTourSection({ isOpen, onToggle }) {
  const tourItems = [
    { time: "10:30", title: "선착장 집결", note: "케이블카 선착장으로 이동 후 시내투어 준비", icon: "👨‍👩‍👧‍👦" },
    { time: "11:15 ~ 11:45", title: "포나가르 참탑", note: "선착장에서 약 15분 이동 · 관람 30분", icon: "🏛️" },
    { time: "12:00 ~ 12:30", title: "롱선사", note: "포나가르 참탑에서 약 10~15분 이동 · 관람 30분", icon: "🙏" },
    { time: "12:45 ~ 13:15", title: "혼총곶", note: "롱선사에서 약 10~15분 이동 · 관람 30분", icon: "🌊" },
    { time: "13:30 ~ 14:20", title: "담시장", note: "혼총곶에서 약 10~15분 이동 · 구경 50분", icon: "🛍️" },
    { time: "14:30 ~ 15:30", title: "롯데마트 나트랑점", note: "담시장에서 약 10~15분 이동 · 쇼핑 60분", icon: "🛒" },
    { time: "15:30 ~ 16:00", title: "선착장 복귀", note: "롯데마트에서 약 15~20분 이동 · 메리어트 선착장 복귀", icon: "⛴️" },
  ];

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
      <button type="button" onClick={onToggle} className="w-full rounded-3xl bg-emerald-50 p-5 text-left active:scale-[0.99]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-black text-emerald-700">3일차 · 5월 8일 금요일</p>
            <h2 className="mt-1 text-3xl font-black text-slate-900 md:text-4xl">🚌 시내투어 일정</h2>
            <p className="mt-3 text-xl font-semibold leading-relaxed text-slate-700">포나가르 참탑 → 롱선사 → 혼총곶 → 담시장 → 롯데마트 → 선착장 복귀</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-teal-600 px-4 py-3 text-lg font-black text-white">{isOpen ? "닫기 ▲" : "보기 ▼"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-5 space-y-3">
          {tourItems.map((item, idx) => <TimelineItem key={idx} item={item} />)}
          <div className="rounded-3xl bg-amber-50 p-5">
            <h3 className="text-2xl font-black text-slate-900">꼭 기억할 것</h3>
            <p className="mt-2 text-xl font-semibold text-slate-700">10:30까지 선착장 집결 · 편한 신발 착용 · 물/모자 준비</p>
          </div>
          <button type="button" onClick={onToggle} className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-xl font-black text-white shadow-sm active:scale-95">시내투어 닫기</button>
        </div>
      )}
    </section>
  );
}

function RoomSection({ isOpen, onToggle }) {
  const rooms = [
    { title: "1127호 · 4베드빌라 A동", groups: [
      { place: "1층", people: "김종민 / 배원옥", type: "원베드" },
      { place: "1층", people: "배선옥", type: "트윈베드" },
      { place: "2층", people: "엄광현 / 배광옥", type: "원베드" },
      { place: "2층", people: "김동근", type: "원베드" },
    ]},
    { title: "1128호 · 4베드빌라 B동", groups: [
      { place: "1층", people: "김수미 / 김태련 / 김하련", type: "원베드" },
      { place: "1층", people: "오희영 / 임유나", type: "원베드" },
      { place: "2층", people: "엄이슬", type: "원베드" },
    ]},
    { title: "미정 · 3베드빌라", groups: [
      { place: "방 배정", people: "박세훈 / 김수경", type: "원베드" },
      { place: "방 배정", people: "김수연", type: "원베드" },
    ]},
  ];

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-7">
      <button type="button" onClick={onToggle} className="w-full text-left active:scale-[0.99]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900">🏠 방배정 전체</h2>
            <p className="mt-2 text-lg font-semibold text-slate-500">빌라/층별로 보기 쉽게 정리했습니다.</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-emerald-600 px-4 py-3 text-lg font-black text-white">{isOpen ? "닫기 ▲" : "보기 ▼"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-5">
          <div className="grid gap-4 md:grid-cols-3">
            {rooms.map((room) => (
              <div key={room.title} className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-2xl font-black text-slate-900">{room.title}</h3>
                <div className="mt-4 space-y-3">
                  {room.groups.map((group, idx) => (
                    <div key={idx} className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-base font-black text-sky-700">{group.place} · {group.type}</p>
                      <p className="mt-1 text-xl font-black text-slate-900">{group.people}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={onToggle} className="mt-4 w-full rounded-2xl bg-slate-700 px-4 py-4 text-xl font-black text-white shadow-sm active:scale-95">방배정 닫기</button>
        </div>
      )}
    </section>
  );
}

function PassportSection({ isOpen, onToggle }) {
  return (
    <section className="rounded-3xl bg-amber-50 p-5 shadow-sm md:p-7">
      <button type="button" onClick={onToggle} className="w-full text-left active:scale-[0.99]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900">🪪 여권정보 전체</h2>
            <p className="mt-2 text-lg font-semibold text-slate-600">공항 체크인 때 바로 확인할 수 있도록 전체 명단을 카드형으로 정리했습니다.</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-slate-700 px-4 py-3 text-lg font-black text-white">{isOpen ? "닫기 ▲" : "보기 ▼"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {passportPeople.map((person) => (
              <div key={person.name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-amber-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-black text-slate-900">{person.name}</p>
                    <p className="mt-1 text-base font-bold text-slate-500">{person.type} · {person.eng}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm font-black text-amber-700">
                    <span className="rounded-full bg-amber-100 px-3 py-1">출국: {person.departSeat}</span>
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-gray-700">귀국: 미정</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-lg font-semibold text-slate-700">
                  <p><span className="font-black text-slate-900">여권번호:</span> {person.passport}</p>
                  <p><span className="font-black text-slate-900">생년월일:</span> {person.birth}</p>
                  <p><span className="font-black text-slate-900">만료일:</span> {person.expire}</p>
                  <p><span className="font-black text-slate-900">예약번호:</span> {person.book}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-500">※ 여권정보가 포함되어 있으니 가족 외부로 공유하지 마세요.</p>
          <button type="button" onClick={onToggle} className="mt-4 w-full rounded-2xl bg-slate-700 px-4 py-4 text-xl font-black text-white shadow-sm active:scale-95">여권정보 닫기</button>
        </div>
      )}
    </section>
  );
}

export default function NhaTrangFamilyTripPage() {
  const [query, setQuery] = useState("");
  const [openSection, setOpenSection] = useState("day-0");

  const toggleSection = (id) => {
    setOpenSection((current) => (current === id ? "" : id));

    // 모바일에서는 상단 버튼 영역이 화면을 가리지 않도록
    // 선택한 섹션이 살짝 아래에서 시작되게 이동합니다.
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 80);
  };

  const filteredDays = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return days;
    return days
      .map((day) => ({
        ...day,
        items: day.items.filter((item) => `${day.date} ${day.theme} ${item.time} ${item.title} ${item.note}`.toLowerCase().includes(q)),
      }))
      .filter((day) => day.items.length > 0 || `${day.date} ${day.theme}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Header />
        <QuickCards />

        <section className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-slate-100">
          <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-7">
            {days.map((day, idx) => (
              <button key={day.day} onClick={() => toggleSection(`day-${idx}`)} className="rounded-2xl bg-sky-600 px-3 py-4 text-lg font-black text-white shadow-sm active:scale-95">
                {day.day}
              </button>
            ))}
            <div className="col-span-2 h-px bg-slate-200 md:col-span-7"></div>
            <button onClick={() => toggleSection("city-tour")} className="rounded-2xl bg-teal-600 px-3 py-4 text-lg font-black text-white shadow-sm active:scale-95">시내투어</button>
            <button onClick={() => toggleSection("rooms")} className="rounded-2xl bg-emerald-600 px-3 py-4 text-lg font-black text-white shadow-sm active:scale-95">방배정</button>
            <button onClick={() => toggleSection("passports")} className="rounded-2xl bg-slate-700 px-3 py-4 text-lg font-black text-white shadow-sm active:scale-95">여권정보</button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black">일정 바로 찾기</h2>
              <p className="text-base font-semibold text-slate-500">예: 마사지, 공항, 저녁식사, 포나가르, 롯데마트</p>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-xl font-bold outline-none md:w-96" placeholder="찾을 내용을 입력하세요" />
          </div>
        </section>

        <section className="space-y-6">
          {filteredDays.map((day) => {
            const originalIndex = days.findIndex((d) => d.day === day.day);
            const id = `day-${originalIndex}`;
            return (
              <div id={id} key={day.day}>
                <DayCard day={day} isOpen={openSection === id} onToggle={() => toggleSection(id)} />
              </div>
            );
          })}
        </section>

        <section className="grid gap-6">
          <div id="city-tour"><CityTourSection isOpen={openSection === "city-tour"} onToggle={() => toggleSection("city-tour")} /></div>
          <div id="rooms"><RoomSection isOpen={openSection === "rooms"} onToggle={() => toggleSection("rooms")} /></div>
          <div id="passports"><PassportSection isOpen={openSection === "passports"} onToggle={() => toggleSection("passports")} /></div>
        </section>
      </div>
    </main>
  );
}
