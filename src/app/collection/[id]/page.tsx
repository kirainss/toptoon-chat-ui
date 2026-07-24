"use client";

import { ChevronLeft, Share2, PictureInPicture, Lock, LockKeyhole, Heart, Star, Sparkles, Gem, ArrowRight, Info, Clock, Box, Droplets, CheckCircle2, RefreshCcw, Crown } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const characterInfo = {
    name: "申雅英",
    totalImages: 142,
    collected: 3,
    remaining: 139,
    progress: 47,
    free: 25,
    premium: 2,
    exclusive: 0,
    royal: 0,
    all: 2,
    avatar: "/images/thumb-char-01.jpg",
  };

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setProgressWidth(characterInfo.progress);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const endingCollections = [
    {
      id: 1,
      title: "甜蜜之夜",
      sub: "路线 A 完成",
      icon: <Heart className="w-5 h-5 text-[#00d084] fill-[#00d084]" />,
      active: true,
      borderColor: "border-[#00d084]/50",
      textColor: "text-[#00d084]",
      badge: "完成"
    },
    {
      id: 2,
      title: "???",
      sub: "条件未达成",
      icon: <Star className="w-5 h-5 text-white/20 fill-white/20" />,
      active: false,
      borderColor: "border-[rgba(255,255,255,0.08)]",
      textColor: "text-[#737373]",
      badge: ""
    },
    {
      id: 3,
      title: "???",
      sub: "需要隐藏路线",
      icon: <Gem className="w-5 h-5 text-white/20 fill-white/20" />,
      active: false,
      borderColor: "border-[rgba(255,255,255,0.08)]",
      textColor: "text-[#737373]",
      badge: ""
    },
    {
      id: 4,
      title: "秘密结局",
      sub: "完成所有路线后解锁",
      icon: <Sparkles className="w-5 h-5 text-white fill-white" />,
      active: false,
      borderColor: "border-[#D8B4FE]/50",
      textColor: "text-[#D8B4FE]",
      badge: "ROYAL"
    }
  ];

  const galleryImages = [
    { id: 1, img: "/images/thumb-char-default-07.jpg", unlocked: true, badge: "" },
    { id: 2, img: "/images/thumb-char-default-08.jpg", unlocked: true, badge: "高级" },
    { id: 3, img: "/images/thumb-char-default-07.jpg", unlocked: true, badge: "独家" },
    { id: 4, img: "/images/thumb-char-default-08.jpg", unlocked: true, badge: "皇家" },
    { id: 5, img: "/images/thumb-char-05.jpg", unlocked: true, badge: "皇家" },
    { id: 6, img: "/images/thumb-char-06.jpg", unlocked: false, badge: "" },
    { id: 7, img: "/images/thumb-char-01.jpg", unlocked: false, badge: "" },
    { id: 8, img: "/images/thumb-char-default-08.jpg", unlocked: false, badge: "" },
    { id: 9, img: "/images/thumb-char-flip-07.jpg", unlocked: false, badge: "" },
  ];

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 md:px-8 pt-0 pb-20 md:py-6 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Top Header / Nav */}
      <div className="h-[55px] md:h-[65px] flex items-center justify-between mb-0 md:mb-6 stagger-item relative px-1 md:px-2">
        <Link href="/collection" className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-transparent md:bg-[#1A1A1A] hover:bg-white/5 md:hover:bg-[#262626] transition-colors relative z-10">
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </Link>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[18px] md:text-[22px] font-bold text-white tracking-tight">{characterInfo.name}</span>
        </div>
        <div className="w-10 md:w-11" /> {/* Balance placeholder for flex spacing */}
      </div>

      {/* Main Stats Card */}
      <section className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-3xl p-5 md:p-6 mb-8 shadow-2xl stagger-item" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar with total images badge */}
          <div className="relative">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-[3px] border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <img src={characterInfo.avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-1 min-w-[20px] px-1 h-[20px] rounded-full bg-[#1A1A1A] flex items-center justify-center border-2 border-[rgba(255,255,255,0.08)] shadow-md z-10 pb-[1px]">
              <span className="text-[9px] font-bold text-[#38bdf8] leading-none mb-[0.5px]">{characterInfo.totalImages}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col justify-center translate-y-[-2px]">
              <div className="flex items-center gap-1 text-[#00d084] mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">最近活跃于 2 天前</span>
              </div>
              <h1 className="text-[18px] md:text-[20px] font-bold text-white tracking-tight leading-none">{characterInfo.name}的秘密收藏集</h1>
            </div>
            <button className="bg-[#00d084] hover:bg-[#00e392] text-[#121212] px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[12px] md:text-[13px] font-bold transition-colors shadow-[0_2px_8px_rgba(0,208,132,0.4)] whitespace-nowrap">
              继续聊天
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="relative h-2 w-full bg-black/50 rounded-full mb-3 overflow-visible">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
            {/* Flame Icon marker (Lottie) */}
            <div
              className="absolute top-1/2 -translate-y-[65%] transform -translate-x-1/2 z-10 w-9 h-9 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-1000 ease-out"
              style={{ left: `${progressWidth}%` }}
            >
              {React.createElement('lottie-player', {
                src: "/json/fire.json",
                background: "transparent",
                speed: "1",
                loop: true,
                autoplay: true,
                style: { width: '100%', height: '100%' }
              })}
            </div>
          </div>
          <div className="flex items-center justify-between text-[12px] md:text-[13px] text-[#A3A3A3] font-medium">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-[6px] h-[6px] md:w-[7px] md:h-[7px] rounded-full bg-[#38bdf8]" />
                <span><strong className="text-[#38bdf8]">{characterInfo.collected}</strong> / {characterInfo.totalImages} 已收集</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LockKeyhole className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#737373]" />
                <span>{characterInfo.remaining} 张未收集</span>
              </div>
            </div>
            <div className="font-bold text-[#38bdf8] text-[13px] md:text-[15px]">达成率 {characterInfo.progress}%</div>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <div className="bg-[#121212] rounded-full px-3 py-1.5 flex items-center justify-center shadow-inner">
            <span className="text-[11px] font-bold text-[#A3A3A3] flex items-center gap-1">
              <Box className="w-3 h-3" />
              全部 <strong className="text-[#00d084] ml-0.5">{characterInfo.all}</strong>
            </span>
          </div>
          <div className="bg-[#121212] rounded-full px-3 py-1.5 flex items-center justify-center shadow-inner">
            <span className="text-[11px] font-bold text-[#A3A3A3] flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              免费 <strong className="text-[#00d084] ml-0.5">{characterInfo.free}</strong>
            </span>
          </div>
          <div className="bg-[#121212] rounded-full px-3 py-1.5 flex items-center justify-center shadow-inner">
            <span className="text-[11px] font-bold text-[#A3A3A3] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              高级 <strong className="text-[#00d084] ml-0.5">{characterInfo.premium}</strong>
            </span>
          </div>
          <div className="bg-[#121212] rounded-full px-3 py-1.5 flex items-center justify-center shadow-inner">
            <span className="text-[11px] font-bold text-[#A3A3A3] flex items-center gap-1">
              <Gem className="w-3 h-3" />
              独家 <strong className="text-[#00d084] ml-0.5">{characterInfo.exclusive}</strong>
            </span>
          </div>
          <div className="bg-[#121212] rounded-full px-3 py-1.5 flex items-center justify-center shadow-inner">
            <span className="text-[11px] font-bold text-[#A3A3A3] flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#D8B4FE]" />
              皇家 <strong className="text-[#00d084] ml-0.5">{characterInfo.royal}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Ending Collection Section */}
      <section className="mb-10 stagger-item" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 mb-4 px-1 relative">
          <h2 className="text-[16px] font-bold text-white tracking-tight">结局收藏</h2>
          <div className="relative flex items-center">
            <button
              onClick={() => setShowRouteMap(!showRouteMap)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            >
              <Info className="w-[18px] h-[18px] text-[#737373] transition-colors hover:text-white" />
            </button>

            {/* Discoverability Tooltip (Outlined Speech Bubble) */}
            {!showRouteMap && (
              <div
                onClick={() => setShowRouteMap(true)}
                className="group absolute left-full ml-3 px-3 py-1 bg-[#1A1A1A] border border-white/20 text-white text-[12px] font-bold rounded-md shadow-lg whitespace-nowrap cursor-pointer z-10 hover:bg-[#262626] transition-colors flex items-center justify-center"
              >
                查看路线图
                <div className="absolute top-1/2 -left-[4.5px] -translate-y-1/2 w-2 h-2 bg-[#1A1A1A] border-l border-b border-white/20 rotate-45 group-hover:bg-[#262626] transition-colors"></div>
              </div>
            )}
          </div>
        </div>

        {/* Route Map Panel (Animated) */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showRouteMap ? 'max-h-[300px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="w-full bg-[#1A1A1A] rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] shadow-inner">
            <h3 className="text-[13px] font-bold text-[rgba(255,255,255,0.6)] mb-6 tracking-tight">路线图</h3>

            {/* Timeline graphic */}
            <div className="relative flex items-center justify-between w-full mb-8 px-2 md:px-6">
              {/* Background line (Inactive) */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[rgba(255,255,255,0.08)] z-0"></div>
              {/* Foreground line (Active) - hardcoded to 50% for this mockup */}
              <div className="absolute top-1/2 left-0 w-1/2 h-[2px] -translate-y-1/2 bg-[#00d084] z-0"></div>

              {/* Route Nodes */}
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-[3px] flex items-center justify-center ${step <= 2 ? 'border-[#00d084] bg-[#00d084]' : step === 3 ? 'border-[#00d084] bg-[#1A1A1A]' : 'border-[#404040] bg-[#1A1A1A]'}`} />
                  <span className={`absolute top-5 md:top-6 text-[10px] md:text-[11px] font-bold ${step <= 3 ? 'text-[#00d084]' : 'text-[#737373]'}`}>Ch.{step}</span>
                </div>
              ))}
            </div>

            {/* Route Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-[#053d26] border border-[#00d084]/20 text-[#00d084] text-[11px] font-bold px-3 py-1.5 rounded-md shadow-inner">
                路线 A 进行中
              </div>
              <div className="bg-[#262626] text-[#737373] text-[11px] font-bold px-3 py-1.5 rounded-md shadow-inner border border-[rgba(255,255,255,0.08)]">
                路线 B 未开放
              </div>
              <div className="bg-[#3b2159] text-[#D8B4FE] text-[11px] font-bold px-3 py-1.5 rounded-md shadow-inner flex items-center gap-1.5 border border-[#D8B4FE]/20">
                隐藏路线 <Lock className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
          {endingCollections.map((ending) => (
            <div
              key={ending.id}
              className={`relative w-full py-4 md:py-5 rounded-2xl bg-[#1A1A1A] border-2 transition-all hover:scale-[1.03] cursor-pointer flex flex-col items-center justify-center 
                ${ending.active ? ending.borderColor : 'border-[rgba(255,255,255,0.08)]'} 
                ${!ending.active && ending.badge === 'ROYAL' ? 'animate-royal-glow overflow-visible' : 'overflow-hidden'}
                ${ending.badge === 'ROYAL' ? 'royal-border-light shadow-[0_0_20px_rgba(216,180,254,0.1)]' : ''}`}
            >
              {ending.badge && (
                <div className={`absolute font-black py-0.5 rounded shadow-lg border border-white/5 z-10 ${ending.badge === 'ROYAL' ? '-top-2 -right-2 bg-[#3b2159] text-[#D8B4FE] text-[9px] px-1.5' : 'top-0 right-0 bg-[#053d26] text-[#00d084] text-[10px] md:text-[11px] px-1.5 py-[1px] rounded-bl-lg'}`}>
                  {ending.badge}
                </div>
              )}
              <div className={`mb-2 w-10 h-10 flex items-center justify-center rounded-full ${ending.active ? 'bg-black/20' : ''} ${!ending.active && ending.badge === 'ROYAL' ? 'opacity-30' : ''} ${!ending.active && !ending.badge ? 'opacity-30' : ''}`}>
                {ending.icon}
              </div>
              <h3 className={`text-[12px] md:text-[13px] font-bold mb-0.5 md:mb-1 ${ending.textColor}`}>{ending.title}</h3>
              <p className="text-[10px] md:text-[11px] text-[#A3A3A3] text-center px-1 font-medium break-keep leading-tight">{ending.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="stagger-item" style={{ animationDelay: '300ms' }}>
        <div className="mb-4 px-1">
          <h2 className="text-[16px] font-bold text-white tracking-tight">场景画廊</h2>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {galleryImages.map((item) => (
            <div key={item.id} className="relative aspect-[3/4.2] rounded-xl overflow-hidden bg-[#1A1A1A] cursor-pointer group">
              <img
                src={item.img}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out 
                  ${item.unlocked ? 'group-hover:scale-105'
                    : item.badge
                      ? 'blur-sm scale-105 opacity-100 group-hover:scale-110'
                      : 'blur-md scale-110 opacity-100 brightness-80'}`}
                alt="gallery"
              />

              {/* Top-left radial gradient overlay for badge readability & high-end feel */}
              {item.badge && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 65%)' }}
                />
              )}

              {item.badge && (
                <div className={`absolute top-2 left-2 px-2.5 py-[3px] rounded-full text-[10px] font-bold shadow-md z-20 ${item.badge === '高级' ? 'bg-[#4A3626] text-[#FACC15]' :
                  item.badge === '独家' ? 'bg-[#1F3523] text-[#4ade80]' :
                    item.badge === '皇家' ? 'bg-[#3b2159] text-[#D8B4FE]' : ''
                  }`}>
                  {item.badge}
                </div>
              )}

              {!item.unlocked ? (
                <>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
        </div>


      </section>

    </div>
  );
}
