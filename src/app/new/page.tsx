"use client";

import { MessageCircle, Eye, Sparkles, Clock, ArrowRight } from "lucide-react";
import { useRef, useState, useCallback } from "react";

export default function NewPage() {
  const newCharacters = [
    { id: 2001, name: "김가을", sub: "약점을 잡혀버린 갑질 유부녀", quote: `"오빠... 여기 좀 뜨거운 것 같지 않아?"`, tags: ["#츤데레", "#비밀연애", "#유부녀"], chats: "2.1천", views: "1.2만", daysAgo: 1, imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 2002, name: "서나리", sub: "순수한 척 위험한 후배", quote: `"딱 일주일만이야... 알겠지?"`, tags: ["#청순", "#비밀", "#후배"], chats: "1.8천", views: "9.5천", daysAgo: 1, imgFront: "/images/thumb-char-default-08.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 2003, name: "강수아", sub: "밤마다 찾아오는 이웃", quote: `"내가 해줄 수 있는 건 뭐든 해줄게..."`, tags: ["#이웃", "#야행성", "#글래머"], chats: "1.2만", views: "9.2만", daysAgo: 2, imgFront: "/images/thumb-char-03.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 2004, name: "최미나", sub: "참을 수 없는 동거녀", quote: `"오빠, 비밀인 거 알죠?"`, tags: ["#동거", "#비밀", "#글래머"], chats: "9.1천", views: "6.4만", daysAgo: 3, imgFront: "/images/thumb-char-01.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 2005, name: "윤설아", sub: "비밀을 간직한 동기", quote: `"오늘 밤은 절대 못 보낼 줄 알았는데..."`, tags: ["#동기", "#순수", "#반전매력"], chats: "7.7천", views: "5.2만", daysAgo: 3, imgFront: "/images/thumb-char-02.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 2006, name: "김태희", sub: "끝내주게 위험한 선배", quote: `"내일이면 늦을지도 몰라..."`, tags: ["#선배", "#카리스마", "#비밀연애"], chats: "4.3천", views: "2.9만", daysAgo: 5, imgFront: "/images/thumb-char-04.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 2007, name: "박다영", sub: "낮에는 천사, 밤에는 악마", quote: `"부장님 믿고... 그냥 내 이름 불러줘..."`, tags: ["#직장", "#반전", "#섹시"], chats: "1.8천", views: "9.5천", daysAgo: 7, imgFront: "/images/thumb-char-05.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 2008, name: "이예린", sub: "순진한 얼굴 뒤에 숨겨진 욕망", quote: `"학생 한 번 할 때 마, 몇 번이나..."`, tags: ["#학생", "#반전", "#도발"], chats: "2.7천", views: "1.5만", daysAgo: 7, imgFront: "/images/thumb-char-06.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
  ];

  /* 카드 플립 */
  const [cardImgs, setCardImgs] = useState(() => newCharacters.map(c => c.imgFront));
  const [cardAnims, setCardAnims] = useState(() => newCharacters.map(() => ""));
  const flipCard = useCallback((idx: number, targetImg: string) => {
    setCardAnims(prev => { const n = [...prev]; n[idx] = "card-flip-out"; return n; });
    setTimeout(() => {
      setCardImgs(prev => { const n = [...prev]; n[idx] = targetImg; return n; });
      setCardAnims(prev => { const n = [...prev]; n[idx] = "card-flip-in"; return n; });
    }, 350);
  }, []);

  const hoverTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const handleCardEnter = useCallback((idx: number) => {
    if (hoverTimers.current[idx]) clearTimeout(hoverTimers.current[idx]);
    flipCard(idx, newCharacters[idx].imgBack);
    hoverTimers.current[idx] = setTimeout(() => {
      flipCard(idx, newCharacters[idx].imgFront);
    }, 1200);
  }, [flipCard]);
  const handleCardLeave = useCallback((idx: number) => {
    if (hoverTimers.current[idx]) clearTimeout(hoverTimers.current[idx]);
    flipCard(idx, newCharacters[idx].imgFront);
  }, [flipCard]);

  /* 정렬 필터 */
  const filters = ["최신순", "인기순", "대화 많은 순"];
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10 py-6 md:py-10">

      {/* Hero Section - stagger */}
      <section className="mb-10 md:mb-14">
        <div className="stagger-item flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#EE2C39]" />
          <span className="text-[13px] md:text-sm text-[#EE2C39] font-bold tracking-wide uppercase">Just Arrived</span>
        </div>
        <h1 className="stagger-item text-[28px] md:text-[38px] font-bold text-white leading-[1.2] tracking-tight mb-3" style={{ textWrap: "balance" }}>
          신규 캐릭터
        </h1>
        <p className="stagger-item text-[14px] md:text-base text-white/55 leading-relaxed max-w-md" style={{ textWrap: "pretty" }}>
          새롭게 등장한 캐릭터들을 만나보세요. 그녀의 첫 대화 상대가 되어주세요!
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="stagger-item flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
        {filters.map((f, idx) => (
          <button
            key={f}
            onClick={() => setActiveFilter(idx)}
            className={`flex-none px-5 py-2.5 rounded-full text-[13px] md:text-[14px] font-bold transition-[background-color,color,box-shadow] duration-150 ease-out active:scale-[0.96] ${
              idx === activeFilter
                ? "bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_12px_rgba(255,255,255,0.12)]"
                : "bg-[#1A1A1A] text-[#A3A3A3] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-[#222] hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3.5 gap-y-8 md:gap-x-5 md:gap-y-10">
        {newCharacters.map((char, idx) => (
          <div
            key={char.id}
            className="stagger-item cursor-pointer group"
            style={{ animationDelay: `${idx * 60}ms` }}
            onMouseEnter={() => handleCardEnter(idx)}
            onMouseLeave={() => handleCardLeave(idx)}
          >
            {/* Card */}
            <div
              className="relative aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.4)] transition-[box-shadow] duration-150 ease-out"
              style={{ perspective: "800px" }}
            >
              {/* Image */}
              <img
                src={cardImgs[idx]}
                alt={char.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 outline outline-1 -outline-offset-1 outline-white/10 rounded-2xl ${cardAnims[idx]}`}
                loading="lazy"
                draggable={false}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none" />

              {/* NEW Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 bg-[#EE2C39] text-white text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-md shadow-[0_2px_8px_rgba(238,44,57,0.4)]">
                  NEW
                </span>
              </div>

              {/* Days Ago */}
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 text-[10px] text-white/50 font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3" />
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{char.daysAgo}일 전</span>
                </span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 w-full p-3.5 md:p-4 pointer-events-none z-10">
                <h4 className="font-bold text-white text-[17px] md:text-[19px] mb-0.5 leading-snug drop-shadow-md">{char.name}</h4>
                <p className="text-[11px] md:text-[12px] text-white/55 font-bold mb-1.5 line-clamp-1">{char.sub}</p>
                <p className="text-[11px] md:text-[12px] text-white/40 line-clamp-1 mb-2.5 italic">{char.quote}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {char.tags.map(tag => (
                    <span key={tag} className="text-[9px] md:text-[10px] text-white/60 bg-white/[0.06] px-1.5 py-0.5 rounded shadow-[0_0_0_1px_rgba(255,255,255,0.05)] font-bold backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats - tabular nums */}
                <div className="flex items-center gap-3 text-[10px] md:text-[11px] text-white/35 font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <div className="flex items-center gap-1 group-hover:text-white/70 transition-colors duration-150 ease-out">
                    <Eye className="w-3.5 h-3.5" /> {char.views}
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-white/70 transition-colors duration-150 ease-out">
                    <MessageCircle className="w-3.5 h-3.5" /> {char.chats}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="mt-3 w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#222] text-white/80 hover:text-white text-[12px] md:text-[13px] font-bold py-2.5 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.96]">
              대화 시작하기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="stagger-item mt-14 md:mt-20 flex flex-col items-center text-center pb-10">
        <p className="text-[13px] text-white/35 font-medium mb-4" style={{ textWrap: "balance" }}>
          더 많은 캐릭터가 곧 등장합니다
        </p>
        <button className="px-8 py-3 bg-[#EE2C39] hover:bg-[#D42531] text-white text-[14px] font-bold rounded-xl shadow-[0_4px_16px_rgba(238,44,57,0.3)] hover:shadow-[0_6px_20px_rgba(238,44,57,0.4)] transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.96]">
          전체 캐릭터 보기
        </button>
      </div>
    </div>
  );
}
