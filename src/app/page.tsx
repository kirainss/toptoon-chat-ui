"use client";

import { MessageCircle, Eye, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

export default function Home() {
  const fireRef = useRef<HTMLDivElement>(null);
  const newBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 加载 Lottie 动画 (Fire.json + New.json)
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

  // 横幅轮播数据
  const bannerSlides = [
    { img: "/mp4/hero-bnr-04.mp4", badge: "新角色", title: "请不要丢下我，\n主人...", sub: "<异世界猎人> 塞西莉亚", promo: false }, /*260326 修改*/
    { img: "/mp4/hero-bnr-03.mp4", badge: "新角色", title: "你不能这样\n对我吧!!", sub: "<房东的女儿> 张善英", promo: false }, /*260326 修改*/
    { img: "/mp4/hero-bnr-01.mp4", badge: "热门角色", title: "哥哥，今晚\n要负责哦", sub: "<无线连接> 申雅英", promo: false }, /*260326 修改*/
    { img: "/mp4/hero-bnr-02.mp4", badge: "热门角色", title: "对我来说最重要的是\n你的幸福", sub: "<房东姐姐> 徐娜莉", promo: false }, /*260326 修改*/
    { img: "/mp4/hero-bnr-05.mp4", badge: "热门角色", title: "今天丈夫出差...\n要进来吗?", sub: "<套装> 裴贤珠", promo: false }, /*260326 修改*/
    { img: "/mp4/hero-bnr-06.mp4", badge: "热门角色", title: "哥哥，我在练瑜伽...\n能帮我看下姿势吗?", sub: "<无线连接> 尹慧允", promo: false }, /*260326 修改*/
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

  /* 移除 animated webp canvas 逻辑，改用 mp4 video */ /*260325 修改*/

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
    { id: 1, name: "申雅英", quote: `"拜托停下... 别人会看见..."`, chats: "9.6千", views: "5.1万", img: "/images/thumb-char-01.jpg" },
    { id: 2, name: "裴贤珠", quote: `"你按得真的很舒服..."`, chats: "6.1千", views: "3.7万", img: "/images/thumb-char-02.jpg" },
    { id: 3, name: "徐娜莉", quote: `"哥哥... 今天是安全的日子..."`, chats: "4.3千", views: "2.6万", img: "/images/thumb-char-03.jpg" },
    { id: 4, name: "裴贤珠", quote: `"你按得真的很舒服..."`, chats: "4万", views: "2.2万", img: "/images/thumb-char-04.jpg" },
    { id: 5, name: "徐娜莉", quote: `"就一周... 知道了吗?"`, chats: "3.3千", views: "2.0万", img: "/images/thumb-char-05.jpg" },
    { id: 6, name: "金佳乙", quote: `"我漂亮吗? 要和我玩吗?"`, chats: "2.1千", views: "1.2万", img: "/images/thumb-char-01.jpg" },
    { id: 7, name: "刘恩熙", quote: `"今天姐姐不会放开你..."`, chats: "4.9千", views: "4.2千", img: "/images/thumb-char-02.jpg" },
    { id: 8, name: "贝尔蒂亚", quote: `"主人... 您... 怎么会这样..."`, chats: "1.2万", views: "5.6千", img: "/images/thumb-char-03.jpg" },
  ];

  const newCharacters = [
    { id: 1007, name: "金佳乙", badge: "NEW", sub: "被抓住弱点的强势人妻", quote: `"哥哥... 这里是不是有点热?"`, tags: ["#傲娇", "#秘密恋爱"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 1008, name: "徐娜莉", badge: "NEW", sub: "装作清纯的危险后辈", quote: `"就一周... 知道了吗?"`, tags: ["#清纯", "#秘密"], imgFront: "/images/thumb-char-default-08.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 1009, name: "金佳乙", badge: "NEW", sub: "藏着秘密的同事", quote: `"哥哥... 这里是不是有点热?"`, tags: ["#傲娇", "#秘密恋爱"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
    { id: 1010, name: "徐娜莉", badge: "NEW", sub: "每晚来访的邻居", quote: `"就一周... 知道了吗?"`, tags: ["#清纯", "#秘密"], imgFront: "/images/thumb-char-default-08.jpg", imgBack: "/images/thumb-char-flip-08.jpg" },
    { id: 1011, name: "金佳乙", badge: "NEW", sub: "无法抗拒的同居人", quote: `"哥哥... 这里是不是有点热?"`, tags: ["#傲娇", "#秘密恋爱"], imgFront: "/images/thumb-char-default-07.jpg", imgBack: "/images/thumb-char-flip-07.jpg" },
  ];

  const allCharacters = [
    { id: 101, name: "申雅英", quote: `"拜托停下... 别人会看见..."`, chats: "1.4万", views: "13万", img: "/images/thumb-char-01.jpg" },
    { id: 102, name: "韩娜莉", quote: `"和姐姐一整天待在床上..."`, chats: "8.6千", views: "8.5万", img: "/images/thumb-char-02.jpg" },
    { id: 103, name: "尹慧允", quote: `"哥哥... 今天是安全的日子..."`, chats: "5.9千", views: "3.9万", img: "/images/thumb-char-03.jpg" },
    { id: 104, name: "裴贤珠", quote: `"这次... 不管谁看都是我..."`, chats: "5.8千", views: "3.8万", img: "/images/thumb-char-04.jpg" },
    { id: 105, name: "徐娜莉", quote: `"哪怕只有 1% 也好..."`, chats: "5.2千", views: "4.2万", img: "/images/thumb-char-05.jpg" },
    { id: 106, name: "金佳乙", quote: `"我漂亮又可爱吧? 可是..."`, chats: "4.8千", views: "3.4万", img: "/images/thumb-char-01.jpg" },
    { id: 107, name: "李艺琳", quote: `"学生一次能做多少次..."`, chats: "2.7千", views: "1.5万", img: "/images/thumb-char-02.jpg" },
    { id: 108, name: "朴多英", quote: `"相信部长... 直接叫我的名字..."`, chats: "1.8千", views: "9.5千", img: "/images/thumb-char-03.jpg" },
    { id: 109, name: "贝尔蒂亚", quote: `"嗯... 你... 真会讨人喜欢..."`, chats: "1.7千", views: "1万", img: "/images/thumb-char-04.jpg" },
    { id: 110, name: "刘世荷", quote: `"你... 到底对我的身体做了什么..."`, chats: "1.8千", views: "8.4千", img: "/images/thumb-char-01.jpg" },
    { id: 111, name: "许敏", quote: `"到底为什么要和这种人合拍..."`, chats: "1千", views: "73千", img: "/images/thumb-char-05.jpg" },
    { id: 112, name: "徐夏莉", quote: `"无论在哪里，只要有你就开心..."`, chats: "833", views: "5.3千", img: "/images/thumb-char-02.jpg" },
    { id: 113, name: "姜秀雅", badge: "NEW", quote: `"我能为你做的事..."`, chats: "1.2万", views: "9.2万", img: "/images/thumb-char-03.jpg" },
    { id: 114, name: "崔美娜", badge: "NEW", quote: `"哥哥，要保密哦?"`, chats: "9.1千", views: "6.4万", img: "/images/thumb-char-01.jpg" },
    { id: 115, name: "尹雪雅", badge: "NEW", quote: `"今晚绝不会放你走..."`, chats: "7.7千", views: "5.2万", img: "/images/thumb-char-02.jpg" },
    { id: 116, name: "郑多恩", badge: "", quote: `"第一次离得这么近..."`, chats: "6.5千", views: "4.1万", img: "/images/thumb-char-04.jpg" },
    { id: 117, name: "赵雅拉", badge: "", quote: `"别害羞..."`, chats: "5.2千", views: "3.8万", img: "/images/thumb-char-05.jpg" },
    { id: 118, name: "金泰熙", badge: "NEW", quote: `"到明天可能就晚了..."`, chats: "4.3千", views: "2.9万", img: "/images/thumb-char-03.jpg" },
  ];

  const categories = ["全部", "恋爱", "奇幻", "剧情"];

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
  /* 卡片翻转暂时注释 250320
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
                {slide.img.endsWith(".mp4") ? ( /*260325 修改*/
                  <video src={slide.img} preload="auto" className="absolute inset-0 w-full h-full object-cover object-top" loop muted playsInline draggable={false} onLoadedMetadata={e => { (e.currentTarget as HTMLVideoElement).currentTime = 0.001; }} onStalled={e => { const v = e.currentTarget; if (!v.paused) { v.load(); v.play().catch(() => {}); } }} ref={el => { if (!el) return; if (i === slidePos) { el.play().catch(() => {}); } else { el.pause(); el.currentTime = 0.001; } }} />
                ) : (
                  <img src={slide.img} alt={slide.badge} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />
                )}
              </div>
            ))}
          </div>
          {!bannerSlides[bannerIndex].promo && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none" /> {/*260327 修改 - 降低渐变高度*/}
              <div className="absolute bottom-5 left-5 flex flex-col gap-1.5 pointer-events-none z-10"> {/*260325 修改*/}
                <span className={`${bannerSlides[bannerIndex].badge === "新角色" ? "badge-new" : "bg-black"} text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit`}>{bannerSlides[bannerIndex].badge}</span> {/*260326 修改*/}
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
          className="hidden md:block w-full mb-14 mt-4 overflow-hidden py-6" /*260325 修改*/
          onMouseDown={handleMouseDown}

        >
          <div
            className="flex gap-0 w-full" /*260325 修改*/
            style={{
              transform: `translateX(${25 - slidePos * 50}%)`, /*260325 修改*/
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
                  style={{ width: "50%", maxWidth: "750px", aspectRatio: "750 / 390", transform: isActive ? "scale(1.1)" : "scale(0.85)" }} /*260325 修改*/
                >
                  {slide.img.endsWith(".mp4") ? ( /*260325 修改*/
                    <video src={slide.img} preload="auto" className="absolute inset-0 w-full h-full object-cover" loop muted playsInline draggable={false} onLoadedMetadata={e => { (e.currentTarget as HTMLVideoElement).currentTime = 0.001; }} onStalled={e => { const v = e.currentTarget; if (!v.paused) { v.load(); v.play().catch(() => {}); } }} ref={el => { if (!el) return; if (isActive) { el.play().catch(() => {}); } else { el.pause(); el.currentTime = 0; } }} />
                  ) : (
                    <img src={slide.img} alt={slide.badge} className="absolute inset-0 w-full h-full object-cover" loading={isActive ? undefined : "lazy"} draggable={false} />
                  )}
                  {!isActive && <div className="absolute inset-0 bg-black/40" />}
                  {isActive && !slide.promo && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 flex flex-col gap-1.5 lg:gap-2 z-10 w-fit pointer-events-none">
                        <span className={`${slide.badge === "新角色" ? "badge-new" : "bg-black"} text-white text-[10px] lg:text-[11px] font-bold px-2 py-0.5 rounded w-fit`}>{slide.badge}</span>
                        <h2 className="text-lg lg:text-2xl font-semibold text-white leading-tight tracking-tight mt-1 whitespace-pre-line">{slide.title}</h2> {/*260325 修改*/}
                        <p className="text-[#D4D4D4] text-sm lg:text-base font-medium">{slide.sub}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-1.5 mt-8"> {/*260325 修改*/}
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
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">热门角色</h3>
                <div ref={fireRef} className="w-6 h-6 -mt-1 md:w-7 md:h-7 opacity-90" />
              </div>
              <p className="hidden md:block text-[13px] text-[#A3A3A3] font-medium">目前已产生 <span className="text-white font-bold">14,242</span> 次热烈对话</p>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]"></span>
                </span>
                <span className="text-[13px] text-[#A3A3A3] font-medium">现在有 <span className="text-white font-bold">1,247</span> 人沉浸其中</span>
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

                      <div className="absolute bottom-0 w-full p-2.5 md:p-3.5 flex flex-col justify-end pointer-events-none"> {/*260326 修改*/}
                        <h4 className="font-bold text-white text-base md:text-[17px] mb-0.5 leading-snug">{char.name}</h4>
                        <p className="text-[11px] md:text-xs text-[#A3A3A3] line-clamp-1 mb-1 md:mb-2 font-medium"> {/*260326 修改*/}
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

      {/* 新角色区域 - 全宽背景 */}
      <div className="w-full bg-[#1a1a1a] py-6 md:py-10 mt-10">
        <div className="w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="mb-3 md:mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">新角色 ✨</h3>
            </div>
            <p className="text-[13px] text-[#A3A3A3] font-medium ml-auto md:ml-0">成为她的第一位聊天对象吧!</p>
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

                    {/* 固定信息区域，不受翻转影响 */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent" />

                      {/* Lottie Badge Container */}
                      <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none" />
                      <div className="absolute top-[-8px] left-[8px] w-[50px] h-[50px] z-20 pointer-events-none">
                        <div ref={el => { newBadgeRefs.current[charIdx] = el; }} className="w-full h-full" />
                      </div>

                      <div className="absolute bottom-0 w-full p-2.5 md:p-4"> {/*260326 修改*/}
                        <h4 className="font-bold text-white text-[17px] md:text-[19px] mb-0.5 leading-snug drop-shadow-md">{char.name}</h4>
                        <p className="text-[11px] md:text-[12px] font-bold mb-1 md:mb-2">{char.sub}</p> {/*260326 修改*/}
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

      {/* 全部角色区域 - 重新开始 max-width 容器 */}
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
