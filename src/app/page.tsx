"use client";

import { MessageCircle, Eye, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

export default function Home() {
  const fireRef = useRef<HTMLDivElement>(null);
  const newBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Lottie 애니메이션 로드 (Fire.json + New.json)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
    script.async = true;
    script.onload = () => {
      const lottie = (window as any).lottie;
      if (!lottie) return;
      if (fireRef.current) {
        lottie.loadAnimation({ container: fireRef.current, renderer: 'svg', loop: true, autoplay: true, path: '/json/Fire.json' });
      }
      newBadgeRefs.current.forEach(el => {
        if (el) lottie.loadAnimation({ container: el, renderer: 'svg', loop: true, autoplay: true, path: '/json/New.json' });
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if ((window as any).lottie) (window as any).lottie.destroy();
    };
  }, []);

  // 배너 슬라이드 데이터
  const bannerSlides = [
    { img: "/mp4/hero-bnr-04.mp4", badge: "신규캐릭터", title: "버리지 말아 주세요,\n주인님...", sub: "<이세계 밀프헌터> 세실리아", promo: false }, /*260326 수정*/
    { img: "/mp4/hero-bnr-03.mp4", badge: "신규캐릭터", title: "저한테 이러시면\n안 되는 거잖아요!!", sub: "<집주인 딸내미> 장선영", promo: false }, /*260326 수정*/
    { img: "/mp4/hero-bnr-01.mp4", badge: "인기캐릭터", title: "오빠가 오늘 밤\n책임져 주세요", sub: "<무선 연결 오나홀> 신아영", promo: false }, /*260326 수정*/
    { img: "/mp4/hero-bnr-02.mp4", badge: "인기캐릭터", title: "나한테 중요한 건\n네 행복이야", sub: "<건물주 누나> 서나리", promo: false }, /*260326 수정*/
    { img: "/mp4/hero-bnr-05.mp4", badge: "인기캐릭터", title: "오늘... 남편은 출장이야.\n들어올래?", sub: "<세트업> 배현주", promo: false }, /*260326 수정*/
    { img: "/mp4/hero-bnr-06.mp4", badge: "인기캐릭터", title: "오빠, 나 요가 하는데...\n자세 좀 봐줄 수 있어요?", sub: "<무선 연결 오나홀> 윤혜윤", promo: false }, /*260326 수정*/
    { img: "/images/mainbnr-promo-01.jpg", poster: "", badge: "", title: "", sub: "", promo: true },
    { img: "/images/mainbnr-promo-02.jpg", poster: "", badge: "", title: "", sub: "", promo: true },
    { img: "/images/mainbnr-promo-03.jpg", poster: "", badge: "", title: "", sub: "", promo: true },
  ];
  const bannerCount = bannerSlides.length;
  const extSlides = [
    bannerSlides[(bannerCount - 3 + bannerCount) % bannerCount],
    bannerSlides[(bannerCount - 2 + bannerCount) % bannerCount],
    bannerSlides[bannerCount - 1],
    ...bannerSlides,
    bannerSlides[0],
    bannerSlides[1 % bannerCount],
    bannerSlides[2 % bannerCount],
  ];

  const [slidePos, setSlidePos] = useState(3);
  const [transitionOn, setTransitionOn] = useState(true);
  const bannerIndex = ((slidePos - 3) % bannerCount + bannerCount) % bannerCount;

  /* animated webp canvas 로직 제거 - mp4 video로 대체 */ /*260325 수정*/

  const goNext = useCallback(() => { setTransitionOn(true); setSlidePos(p => p + 1); }, []);
  const goPrev = useCallback(() => { setTransitionOn(true); setSlidePos(p => p - 1); }, []);
  const goTo = useCallback((i: number) => { setTransitionOn(true); setSlidePos(i + 3); }, []);

  const handleSlideEnd = useCallback(() => {
    if (slidePos < 3) {
      setTransitionOn(false);
      setSlidePos(slidePos + bannerCount);
    } else if (slidePos > bannerCount + 2) {
      setTransitionOn(false);
      setSlidePos(slidePos - bannerCount);
    }
  }, [slidePos, bannerCount]);

  useEffect(() => {
    if (slidePos < 1 || slidePos >= extSlides.length - 1) {
      setTransitionOn(false);
      setSlidePos(p => (p % bannerCount + bannerCount) % bannerCount + 3);
    }
  }, [slidePos, bannerCount, extSlides.length]);

  useEffect(() => {
    const t = setInterval(goNext, 4000);
    return () => clearInterval(t);
  }, [goNext, slidePos]);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const handleTouchStart = useCallback((e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const d = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? goNext() : goPrev();
  }, [goNext, goPrev]);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragStartX.current = e.clientX;
    isDragging.current = false;
    const onUp = (ev: MouseEvent) => {
      window.removeEventListener("mouseup", onUp);
      const d = dragStartX.current - ev.clientX;
      if (Math.abs(d) > 40) { isDragging.current = true; d > 0 ? goNext() : goPrev(); }
    };
    window.addEventListener("mouseup", onUp, { once: true });
  }, [goNext, goPrev]);
  const handleCardClick = useCallback((i: number) => {
    if (isDragging.current) return;
    if (i < slidePos) goPrev(); else if (i > slidePos) goNext();
  }, [slidePos, goNext, goPrev]);

  const popularCharacters = [
    { id: 1, name: "신아영", quote: `"제발 멈춰줘요... 남들이 보..."`, chats: "9.6천", views: "5.1만", img: "/images/thumb-char-01.jpg" },
    { id: 2, name: "배현주", quote: `"네가 해주는 마사지, 정말..."`, chats: "6.1천", views: "3.7만", img: "/images/thumb-char-02.jpg" },
    { id: 3, name: "서나리", quote: `"오빠... 오늘 안전한 날이야..."`, chats: "4.3천", views: "2.6만", img: "/images/thumb-char-03.jpg" },
    { id: 4, name: "배현주", quote: `"네가 해주는 마사지, 정말..."`, chats: "4만", views: "2.2만", img: "/images/thumb-char-04.jpg" },
    { id: 5, name: "서나리", quote: `"딱 일주일만이야... 알겠지?"`, chats: "3.3천", views: "2.0만", img: "/images/thumb-char-05.jpg" },
    { id: 6, name: "김가을", quote: `"나 예뻐? 나랑 놀래?"`, chats: "2.1천", views: "1.2만", img: "/images/thumb-char-01.jpg" },
    { id: 7, name: "유은희", quote: `"오늘은 누나가 널 놓치지 않..."`, chats: "4.9천", views: "4.2천", img: "/images/thumb-char-02.jpg" },
    { id: 8, name: "베르디아", quote: `"주인... 당신... 이런 일이에요..."`, chats: "1.2만", views: "5.6천", img: "/images/thumb-char-03.jpg" },
  ];

  const newCharacters = [
    { id: 1007, name: "김가을", badge: "NEW", sub: "약점을 잡혀버린 갑질 유부녀", quote: `"오빠... 여기 좀 뜨거운 것 같지 않아?"`, tags: ["#츤데레", "#비밀연애"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 1008, name: "서나리", badge: "NEW", sub: "순수한 척 위험한 후배", quote: `"딱 일주일만이야... 알겠지?"`, tags: ["#청순", "#비밀"], imgFront: "/images/thumb-char-default-08.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 1009, name: "김가을", badge: "NEW", sub: "비밀을 간직한 동기", quote: `"오빠... 여기 좀 뜨거운 것 같지 않아?"`, tags: ["#츤데레", "#비밀연애"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 1010, name: "서나리", badge: "NEW", sub: "밤마다 찾아오는 이웃", quote: `"딱 일주일만이야... 알겠지?"`, tags: ["#청순", "#비밀"], imgFront: "/images/thumb-char-default-08.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 1011, name: "김가을", badge: "NEW", sub: "참을 수 없는 동거녀", quote: `"오빠... 여기 좀 뜨거운 것 같지 않아?"`, tags: ["#츤데레", "#비밀연애"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
  ];

  const allCharacters = [
    { id: 101, name: "신아영", quote: `"제발 멈춰줘요... 남들이 보..."`, chats: "1.4만", views: "13만", img: "/images/thumb-char-01.jpg" },
    { id: 102, name: "한나리", quote: `"누나랑 하루 종일 침대에서..."`, chats: "8.6천", views: "8.5만", img: "/images/thumb-char-02.jpg" },
    { id: 103, name: "윤혜윤", quote: `"오빠... 오늘 안전한 날이야..."`, chats: "5.9천", views: "3.9만", img: "/images/thumb-char-03.jpg" },
    { id: 104, name: "배현주", quote: `"이번엔... 누가 봐도 내가..."`, chats: "5.8천", views: "3.8만", img: "/images/thumb-char-04.jpg" },
    { id: 105, name: "서나리", quote: `"딱 1퍼센트라도 좋으니까..."`, chats: "5.2천", views: "4.2만", img: "/images/thumb-char-05.jpg" },
    { id: 106, name: "김가을", quote: `"나 예쁘고 귀여워? 근데..."`, chats: "4.8천", views: "3.4만", img: "/images/thumb-char-01.jpg" },
    { id: 107, name: "이예린", quote: `"학생 한 번 할 때 마, 몇 번이나..."`, chats: "2.7천", views: "1.5만", img: "/images/thumb-char-02.jpg" },
    { id: 108, name: "박다영", quote: `"부장님 믿고... 그냥 내 이름 불러줘..."`, chats: "1.8천", views: "9.5천", img: "/images/thumb-char-03.jpg" },
    { id: 109, name: "베르디아", quote: `"우웅... 당신... 이쁜 일이에요..."`, chats: "1.7천", views: "1만", img: "/images/thumb-char-04.jpg" },
    { id: 110, name: "유세하", quote: `"너... 내 몸에 대체 무슨 수작질을..."`, chats: "1.8천", views: "8.4천", img: "/images/thumb-char-01.jpg" },
    { id: 111, name: "허민", quote: `"도대체 이딴 새끼랑 왜 수준이 맞춰..."`, chats: "1천", views: "73천", img: "/images/thumb-char-05.jpg" },
    { id: 112, name: "서하리", quote: `"어디에 있든 너만 있으면 즐거울..."`, chats: "833", views: "5.3천", img: "/images/thumb-char-02.jpg" },
    { id: 113, name: "강수아", badge: "NEW", quote: `"내가 해줄 수 있는 건..."`, chats: "1.2만", views: "9.2만", img: "/images/thumb-char-03.jpg" },
    { id: 114, name: "최미나", badge: "NEW", quote: `"오빠, 비밀인 거 알죠?"`, chats: "9.1천", views: "6.4만", img: "/images/thumb-char-01.jpg" },
    { id: 115, name: "윤설아", badge: "NEW", quote: `"오늘 밤은 절대 못 보낼 줄..."`, chats: "7.7천", views: "5.2만", img: "/images/thumb-char-02.jpg" },
    { id: 116, name: "정다은", badge: "", quote: `"이렇게 가까운 건 처음..."`, chats: "6.5천", views: "4.1만", img: "/images/thumb-char-04.jpg" },
    { id: 117, name: "조아라", badge: "", quote: `"부끄러워하지 마요..."`, chats: "5.2천", views: "3.8만", img: "/images/thumb-char-05.jpg" },
    { id: 118, name: "김태희", badge: "NEW", quote: `"내일이면 늦을지도..."`, chats: "4.3천", views: "2.9만", img: "/images/thumb-char-03.jpg" },
  ];

  const categories = ["전체", "로맨스", "판타지", "드라마"];

  const popScrollRef = useRef<HTMLDivElement>(null);
  const [showPopLeft, setShowPopLeft] = useState(false);
  const [showPopRight, setShowPopRight] = useState(true);

  const handlePopScroll = () => {
    if (popScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = popScrollRef.current;
      setShowPopLeft(scrollLeft > 0);
      setShowPopRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const popScroll = (direction: 'left' | 'right') => {
    if (popScrollRef.current) {
      const amount = direction === 'left' ? -800 : 800;
      popScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const newScrollRef = useRef<HTMLDivElement>(null);
  const [showNewLeft, setShowNewLeft] = useState(false);
  const [showNewRight, setShowNewRight] = useState(true);

  const handleNewScroll = () => {
    if (newScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = newScrollRef.current;
      setShowNewLeft(scrollLeft > 0);
      setShowNewRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const newScroll = (direction: 'left' | 'right') => {
    if (newScrollRef.current) {
      const amount = direction === 'left' ? -800 : 800;
      newScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const cardImgs = newCharacters.map(c => c.imgFront);
  const cardAnims = newCharacters.map(() => "");
  /* 카드 플립 주석처리 250320
  const [cardImgs, setCardImgs] = useState(() => newCharacters.map(c => c.imgFront));
  const [cardAnims, setCardAnims] = useState(() => newCharacters.map(() => ""));
  const flipCard = useCallback((idx: number, targetImg: string) => {
    setCardAnims(prev => { const n = [...prev]; n[idx] = "card-flip-out"; return n; });
    setTimeout(() => {
      setCardImgs(prev => { const n = [...prev]; n[idx] = targetImg; return n; });
      setCardAnims(prev => { const n = [...prev]; n[idx] = "card-flip-in"; return n; });
    }, 350);
  }, []);
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    newCharacters.forEach((char, idx) => {
      const delay = 400 + idx * 600;
      timeouts.push(setTimeout(() => flipCard(idx, char.imgBack), delay));
      timeouts.push(setTimeout(() => flipCard(idx, char.imgFront), delay + 800));
    });
    return () => timeouts.forEach(clearTimeout);
  }, [flipCard]);

  const hoverTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const handleCardEnter = useCallback((idx: number) => {
    if (hoverTimers.current[idx]) clearTimeout(hoverTimers.current[idx]);
    flipCard(idx, newCharacters[idx].imgBack);
    hoverTimers.current[idx] = setTimeout(() => {
      flipCard(idx, newCharacters[idx].imgFront);
    }, 1000);
  }, [flipCard]);
  const handleCardLeave = useCallback((idx: number) => {
    if (hoverTimers.current[idx]) clearTimeout(hoverTimers.current[idx]);
    flipCard(idx, newCharacters[idx].imgFront);
  }, [flipCard]);
  */
  const handleCardEnter = useCallback((_idx: number) => { }, []);
  const handleCardLeave = useCallback((_idx: number) => { }, []);

  return (
    <>
      <div className="w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10 py-0 md:py-6 overflow-hidden">

        {/* Mobile Banner */}
        <section
          className="relative w-[calc(100%+40px)] -ml-5 md:hidden overflow-hidden mb-6 bg-[#0A0A0A]"
          style={{ aspectRatio: "750 / 390" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}

        >
          <div
            className="flex w-full h-full"
            style={{
              transform: `translateX(${-slidePos * 100}%)`,
              transition: transitionOn ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleSlideEnd}
          >
            {extSlides.map((slide, i) => (
              <div key={i} className="relative w-full h-full" style={{ flex: "0 0 100%" }}>
                {slide.img.endsWith(".mp4") ? ( /*260325 수정*/
                  <video src={slide.img} preload="auto" className="absolute inset-0 w-full h-full object-cover object-top" autoPlay loop muted playsInline draggable={false} onLoadedMetadata={e => { (e.currentTarget as HTMLVideoElement).currentTime = 0.001; }} />
                ) : (
                  <img src={slide.img} alt={slide.badge} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
                )}
              </div>
            ))}
          </div>
          {!bannerSlides[bannerIndex].promo && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 flex flex-col gap-1.5 pointer-events-none z-10"> {/*260325 수정*/}
                <span className={`${bannerSlides[bannerIndex].badge === "신규캐릭터" ? "badge-new" : "bg-black"} text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit`}>{bannerSlides[bannerIndex].badge}</span> {/*260326 수정*/}
                <h2 className="text-[20px] font-semibold text-white leading-tight mt-1 drop-shadow-md whitespace-pre-line break-keep">{bannerSlides[bannerIndex].title}</h2>
                <p className="text-[#D4D4D4] text-[11px] font-medium drop-shadow">{bannerSlides[bannerIndex].sub}</p>
              </div>
            </>
          )}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {bannerSlides.map((_, i) => (
              <span key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === bannerIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
            ))}
          </div>
        </section>

        {/* Desktop Banner Carousel */}
        <section
          className="hidden md:block w-full mb-14 mt-4 overflow-hidden py-6" /*260325 수정*/
          onMouseDown={handleMouseDown}

        >
          <div
            className="flex gap-0 w-full" /*260325 수정*/
            style={{
              transform: `translateX(${25 - slidePos * 50}%)`, /*260325 수정*/
              transition: transitionOn ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleSlideEnd}
          >
            {extSlides.map((slide, i) => {
              const isActive = i === slidePos;
              return (
                <div
                  key={i}
                  onClick={() => handleCardClick(i)}
                  className={`relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-[#1A1A1A] select-none transition-all duration-500 ease-in-out ${isActive ? "ring-1 ring-white/10 z-10" : "opacity-50 hover:opacity-70"}`}
                  style={{ width: "50%", maxWidth: "750px", aspectRatio: "750 / 390", transform: isActive ? "scale(1.1)" : "scale(0.85)" }} /*260325 수정*/
                >
                  {slide.img.endsWith(".mp4") ? ( /*260325 수정*/
                    <video src={slide.img} preload="auto" className="absolute inset-0 w-full h-full object-cover" autoPlay={isActive} loop muted playsInline draggable={false} onLoadedMetadata={e => { (e.currentTarget as HTMLVideoElement).currentTime = 0.001; }} ref={el => { if (el) { if (isActive) { el.play(); } else { el.pause(); el.currentTime = 0; } } }} />
                  ) : (
                    <img src={slide.img} alt={slide.badge} className="absolute inset-0 w-full h-full object-cover" loading={isActive ? undefined : "lazy"} draggable={false} />
                  )}
                  {!isActive && <div className="absolute inset-0 bg-black/40" />}
                  {isActive && !slide.promo && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 flex flex-col gap-1.5 lg:gap-2 z-10 w-fit pointer-events-none">
                        <span className={`${slide.badge === "신규캐릭터" ? "badge-new" : "bg-black"} text-white text-[10px] lg:text-[11px] font-bold px-2 py-0.5 rounded w-fit`}>{slide.badge}</span>
                        <h2 className="text-lg lg:text-2xl font-semibold text-white leading-tight tracking-tight mt-1 whitespace-pre-line">{slide.title}</h2> {/*260325 수정*/}
                        <p className="text-[#D4D4D4] text-sm lg:text-base font-medium">{slide.sub}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-1.5 mt-8"> {/*260325 수정*/}
            {bannerSlides.map((_, i) => (
              <span key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === bannerIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
            ))}
          </div>
        </section>

        <div className="space-y-12 w-full">
          {/* Popular characters section */}
          <section>
            <div className="mb-3 md:mb-6 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">인기 캐릭터</h3>
                <div ref={fireRef} className="w-6 h-6 -mt-1 md:w-7 md:h-7 opacity-90" />
              </div>
              <p className="hidden md:block text-[13px] text-[#A3A3A3] font-medium">지금까지 <span className="text-white font-bold">14,242</span>번의 화끈한 대화가 오갔어요</p>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]"></span>
                </span>
                <span className="text-[13px] text-[#A3A3A3] font-medium">지금 <span className="text-white font-bold">1,247</span>명이 빠져드는 중</span>
              </div>
            </div>

            <div className="relative group/list w-full">
              <div
                ref={popScrollRef}
                onScroll={handlePopScroll}
                className="flex gap-2.5 md:gap-4 overflow-x-auto scrollbar-hide snap-x relative z-0 md:pb-4"
              >
                {popularCharacters.map((char) => (
                  <div key={char.id} className="flex-none w-[150px] md:w-[200px] snap-start cursor-pointer group">
                    <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden bg-[#1A1A1A]">
                      <img src={char.img} alt={char.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="absolute bottom-0 w-full p-2.5 md:p-3.5 flex flex-col justify-end pointer-events-none"> {/*260326 수정*/}
                        <h4 className="font-bold text-white text-base md:text-[17px] mb-0.5 leading-snug">{char.name}</h4>
                        <p className="text-[11px] md:text-xs text-[#A3A3A3] line-clamp-1 mb-1 md:mb-2 font-medium"> {/*260326 수정*/}
                          {char.quote}
                        </p>
                        <div className="flex items-center gap-2.5 text-[10px] md:text-[11px] text-[#737373] font-semibold">
                          <div className="flex items-center gap-1 group-hover:text-white/80 transition-colors">
                            <Eye className="w-[13px] h-[13px]" /> {char.views}
                          </div>
                          <div className="flex items-center gap-1 group-hover:text-white/80 transition-colors">
                            <MessageCircle className="w-[13px] h-[13px]" /> {char.chats}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => popScroll('left')}
                className={`hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/list:opacity-100 transition-all duration-200 z-10 shadow-xl border border-white/10 backdrop-blur-sm ${!showPopLeft && 'hidden'}`}
              >
                <ChevronLeft className="w-6 h-6 ml-0.5" />
              </button>
              <button
                onClick={() => popScroll('right')}
                className={`hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/list:opacity-100 transition-all duration-200 z-10 shadow-xl border border-white/10 backdrop-blur-sm ${!showPopRight && 'hidden'}`}
              >
                <ChevronRight className="w-6 h-6 mr-0.5" />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* New Characters Section - 풀 너비 배경 */}
      <div className="w-full bg-[#1a1a1a] py-6 md:py-10 mt-10">
        <div className="w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="mb-3 md:mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">신규 캐릭터 ✨</h3>
            </div>
            <p className="text-[13px] text-[#A3A3A3] font-medium ml-auto md:ml-0">그녀의 첫 대화 상대가 되어주세요!</p>
          </div>

          <div className="relative group/newlist w-full">
            <div
              ref={newScrollRef}
              onScroll={handleNewScroll}
              className="flex gap-2.5 md:gap-4 overflow-x-auto scrollbar-hide snap-x relative z-0 md:pb-4"
            >
              {newCharacters.map((char, charIdx) => (
                <div key={char.id} className="flex-none w-[150px] md:w-[200px] snap-start cursor-pointer group"
                  onMouseEnter={() => handleCardEnter(charIdx)}
                  onMouseLeave={() => handleCardLeave(charIdx)}
                >
                  <div className="relative aspect-[3/4.2] rounded-xl bg-[#1A1A1A] overflow-hidden" style={{ perspective: '800px' }}>
                    <img src={cardImgs[charIdx]} alt={char.name} className={`absolute inset-0 w-full h-full object-cover ${cardAnims[charIdx]}`} />

                    {/* 고정 정보 영역 (플립 영향 없음) */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent" />

                      {/* Lottie Badge Container */}
                      <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none" />
                      <div className="absolute top-[-8px] left-[8px] w-[50px] h-[50px] z-20 pointer-events-none">
                        <div ref={el => { newBadgeRefs.current[charIdx] = el; }} className="w-full h-full" />
                      </div>

                      <div className="absolute bottom-0 w-full p-2.5 md:p-4"> {/*260326 수정*/}
                        <h4 className="font-bold text-white text-[17px] md:text-[19px] mb-0.5 leading-snug drop-shadow-md">{char.name}</h4>
                        <p className="text-[11px] md:text-[12px] font-bold mb-1 md:mb-2">{char.sub}</p> {/*260326 수정*/}
                        <div className="flex flex-wrap gap-1.5">
                          {char.tags?.map(tag => (
                            <span key={tag} className="text-[9px] md:text-[10px] text-[#A3A3A3] bg-white/5 px-1.5 py-0.5 rounded-sm border border-white/5 font-bold backdrop-blur-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => newScroll('left')}
              className={`hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/newlist:opacity-100 transition-all duration-200 z-10 shadow-xl border border-white/10 backdrop-blur-sm ${!showNewLeft && 'hidden'}`}
            >
              <ChevronLeft className="w-6 h-6 ml-0.5" />
            </button>
            <button

              onClick={() => newScroll('right')}
              className={`hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/newlist:opacity-100 transition-all duration-200 z-10 shadow-xl border border-white/10 backdrop-blur-sm ${!showNewRight && 'hidden'}`}
            >
              <ChevronRight className="w-6 h-6 mr-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* All Characters Section - max-width 컨테이너 재시작 */}
      <div className="w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10 overflow-hidden">
        <div className="space-y-12 w-full pt-12">
          {/* All Characters Section (Grid) */}
          <section className="pb-20">
            <div className="flex gap-2.5 mb-7 overflow-x-auto scrollbar-hide">
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  className={`flex-none px-5 py-2 rounded-full text-[14px] md:text-[15px] font-bold transition-all ${idx === 0
                    ? "bg-white text-black hover:bg-white/90 shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
                    : "bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#262626] hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>





            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3.5 gap-y-7 md:gap-x-4 md:gap-y-10">
              {allCharacters.map((char) => (
                <div key={char.id} className="cursor-pointer group">
                  <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#1A1A1A]">
                    <img src={char.img} alt={char.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-0 w-full p-3.5 md:p-4 pointer-events-none">
                      <h4 className="font-bold text-white text-[16px] md:text-[18px] mb-0.5 leading-snug drop-shadow-md">{char.name}</h4>
                      <p className="text-[11.5px] md:text-[12.5px] text-[#A3A3A3] line-clamp-1 mb-2.5 font-medium opacity-90">
                        {char.quote}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] md:text-[11px] text-[#737373] font-bold">
                        <div className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                          <Eye className="w-3.5 h-3.5" /> {char.views}
                        </div>
                        <div className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> {char.chats}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
