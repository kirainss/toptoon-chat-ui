"use client";

import { ChevronDown, ChevronLeft, Lock, Eye, MessageCircle, Heart, RefreshCw, Copy, ThumbsUp, ThumbsDown, Sparkles, Settings, Camera, Mic, Pencil, Image as ImageIcon, Menu, MoreVertical, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const character = {
  name: "신아영",
  quote: "\"제발 임힘취요... 남들 보면 어쩌려고... 하아, 시키는 대로 다 할게요...\"",
  tags: ["#우니들", "#우산먼물리나들", "#신아영", "#클라카", "#글라피", "#노벨피아 원작"],
  views: "221,302", chats: "19,875", likes: "356",
  avatar: "/images/thumb-char-01.jpg",
  images: ["/images/img-chat-01.webp", "/images/img-chat-02.webp"],
  bio: "학교에서 모든 이의 시선을 끄는 완벽한 현카, 신아영. 누구도 눈빛만으로 넘어갈 수 있는 노련한 미소를 지은 그녀, 하지만 그 미소의 뒤를 들여다 보면 남들과는 다른 비밀의 정원이 숨...",
};

interface ChatMsg { type: "character" | "user" | "narration"; content: string; }

const chatMessages: ChatMsg[] = [
  { type: "narration", content: "얼굴을 가웃거리며 투니의 이상한 말에 의아한 표정을 짓다가, 손에 쥐고 있던 투니의 성기를 살짝 꼬집으며 투정 부린다" },
  { type: "character", content: "갑자기 무슨 소리에요? 다른 생각 하고 있었어요? 오빠 진짜 나쁘다..." },
  { type: "narration", content: "몸을 앞으로 기울여 투니의 입술을 재빨듯 키스하며, 속옷 끈을 풀어 가슴을 드러낸다. 투니의 손을 자신의 꽃잎에 갖다대며 꼬지락거리는 척하며 속삭인다" },
  { type: "character", content: "그냥 저랑 대화만 해야지, 다른 생각 하면 벌 줄 거요. 오늘 밤에 한 번만! 사정하게 해줄 거예요. 아까 점별 운세 다 못 들었잖아요? 6월 운세도 아직 제대로 안 알려줬는데..." },
  { type: "narration", content: "가슴을 투니의 얼굴에 비비며, 손으로는 계속 투니의 성기를 움직여 흥분을 키운다. 눈은 반쯤 감겨서 모호한 채 웃음소리를 넘어 신음한다" },
  { type: "user", content: "왜 그냥 이미지가 해금되는거" },
  { type: "narration", content: "갑자기 무슨 소리나는 듯 고개를 가웃하던 아영이, 투니의 말이 끝나자 입술을 살짝 빼쭉 내밀고 침대 시트를 꼬지락거린다" },
  { type: "character", content: "무슨 소리에요? 제가 뭐 이미지처럼 보여요?" },
  { type: "narration", content: "이미 말투가 평소의 수줍은 모습으로 돌아와 손으로 가슴을 살짝 가리다가, 다시 손을 빼어 투니의 목을 감싸고 기어올라 얼굴을 바라본다. 눈가에 살짝 수줍은 홍조가 번져있는 채로, 속삭이듯 말을 이어간다" },
  { type: "character", content: "그냥... 오빠 앞에서 보여주고 싶었어요. 다른 사람한테는 절대 안 보여주는데, 오빠한테만 이런 모습 보여주는 거예요." },
  { type: "narration", content: "손을 투니의 허리 아래로 내려가 성기를 다시 꼭 잡고, 천천히 몸을 움직여 속옷 속감이며 성기가 자신의 것에 닿게 한다. 숨을 헐떡이며 투니의 귓가에 대고 소리를 낮춘다" },
  { type: "character", content: "진짜로... 오빠만 볼 수 있는 모습이니까, 꼭 기억해줘요." },
];

export default function ChatPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flashKey, setFlashKey] = useState(0); /*260325 추가*/
  const [activeMode, setActiveMode] = useState<"일상톡" | "설렘톡">("설렘톡");
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  /* fx 영상 재생 — reveal 전용 (로드 대기 포함) */ /*260325 수정*/
  const playFxGroup = (group: string) => {
    document.querySelectorAll<HTMLVideoElement>(`video[data-fx="${group}"]`).forEach((v) => {
      v.pause(); v.currentTime = 0; v.style.opacity = "1"; /*260325 수정*/
      v.playbackRate = 1.4; /*260325 수정*/
      const doPlay = () => { const p = v.play(); if (p) p.catch(() => {}); v.onended = () => { v.style.opacity = "0"; }; }; /*260325 수정*/
      if (v.readyState >= 3) { doPlay(); } else { v.addEventListener("canplaythrough", doPlay, { once: true }); v.load(); } /*260325 수정*/
    });
  };

  /* 최초 이미지 로드 시 빛 효과 재생 */ /*260325 수정*/
  useEffect(() => {
    const fxVideos = document.querySelectorAll<HTMLVideoElement>("video[data-fx]"); /*260325 수정*/
    fxVideos.forEach((v) => { v.style.opacity = "0"; v.load(); }); /* load() 강제 호출 */ /*260325 수정*/
    let triggered = false;
    const triggerReveal = () => {
      if (triggered) return;
      triggered = true;
      requestAnimationFrame(() => playFxGroup("reveal-std")); /*260326 수정 — 이미지0=프리미엄=fx.webm*/
    };
    const img = new Image();
    img.src = character.images[0];
    if (img.complete) { triggerReveal(); } else { img.onload = triggerReveal; } /*260325 수정*/
    const fallback = setTimeout(triggerReveal, 1000); /*260325 수정*/
    return () => clearTimeout(fallback);
  }, []);

  /* 책장 넘기기 이미지 전환 — 화이트 플래시 + reveal */ /*260325 수정*/
  const flipToImage = (targetIdx: number) => {
    if (isFlipping || targetIdx === currentImg) return;
    setFlashKey(k => k + 1); /* 넘기기 전 하얀 빛 */ /*260325 수정*/
    setNextImg(targetIdx);
    setIsFlipping(true);
    setTimeout(() => { if (targetIdx === 0) { playFxGroup("reveal-std"); } else { playFxGroup("reveal-edge"); playFxGroup("reveal-ex"); } }, 750); /* 프리미엄=fx.webm / 익스클루시브=fx-edge+fx-ex 동시 재생 */ /*260326 수정*/
    setTimeout(() => {
      setCurrentImg(targetIdx);
      setIsFlipping(false);
    }, 1100);
  };
  /* 자동 플립 — 8초 간격 */
  useEffect(() => {
    const timer = setInterval(() => { flipToImage((currentImg + 1) % character.images.length); }, 8000);
    return () => clearInterval(timer);
  }, [currentImg, isFlipping]);

  /* 채팅 메시지 렌더 */
  const renderMsg = (msg: ChatMsg, i: number) => {
    if (msg.type === "narration") return <p key={i} className="text-[13px] text-[#888] leading-relaxed text-center px-4 py-2">{msg.content}</p>;
    if (msg.type === "character") return (
      <div key={i} className="flex items-start gap-2.5 max-w-[85%]">
        <img src={character.avatar} alt={character.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-1" />
        <div>
          <span className="text-[13px] font-bold text-[#ccc] mb-1.5 block">{character.name}</span>
          <div className="bg-[#2A2A2A] rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-[#E5E5E5] leading-relaxed">{msg.content}</div>
        </div>
      </div>
    );
    return (
      <div key={i} className="flex flex-col items-end">
        <span className="text-[12px] text-[#999] mb-1.5 mr-1">나</span>
        <div className="bg-[#333] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] text-white leading-relaxed max-w-[75%]">{msg.content}</div>
      </div>
    );
  };

  /* 모드 토글 버튼 */
  const ModeBar = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button className="p-2 text-[#737373] hover:text-white transition-colors"><Sparkles className="w-[18px] h-[18px]" /></button>
      <button className="p-2 text-[#737373] hover:text-white transition-colors"><Settings className="w-[18px] h-[18px]" /></button>
      <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold transition-colors ${activeMode === "일상톡" ? "bg-white/10 text-white" : "text-[#737373]"}`} onClick={() => setActiveMode("일상톡")}><MessageCircle className="w-2.5 h-2.5" /> 일상톡</button>
      <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold transition-colors ${activeMode === "설렘톡" ? "bg-[#EE2C39]/20 text-[#EE2C39]" : "text-[#737373]"}`} onClick={() => setActiveMode("설렘톡")}><Heart className="w-2.5 h-2.5 fill-current" /> 설렘톡</button>
    </div>
  );

  /* 입력창 */
  const InputBar = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <input type="text" placeholder={`${character.name}에게 메시지 보내기...`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 bg-[#2A2A2A] text-white text-sm placeholder-[#737373] rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-shadow" />
      <button className="w-11 h-11 bg-[#EAB308] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#CA9B06] transition-colors active:scale-95">
        <Mic className="w-5 h-5 text-white" />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 md:left-[260px] z-[55] flex flex-col overflow-hidden bg-[#121212]">

      {/* ====== DESKTOP 채팅 헤더 ====== */}
      <div className="hidden md:flex items-center h-[52px] px-4 bg-[#121212] border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-[#A3A3A3] hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></button>
          <button className="p-1.5 text-[#A3A3A3] hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <img src={character.avatar} alt={character.name} className="w-7 h-7 rounded-full object-cover" />
          <span className="text-[14px] font-bold text-white">{character.name}</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5 bg-[#261E0A] text-[#FACC15] px-3 py-1.5 rounded-full border border-[#EAB308]/20">
            <img src="/images/chatCoin.png" alt="coin" className="w-[18px] h-[18px]" />
            <span className="font-bold text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>44,540</span>
          </div>
          <button className="p-1.5 text-[#A3A3A3] hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </div>

      {/* ====== DESKTOP 3-COLUMN ====== */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* 좌측: 캐릭터 이미지 */}
        <div className="w-[42%] lg:w-[38%] flex flex-col bg-black flex-shrink-0">
          {/* 이미지 헤더 바 */}
          <div className="flex items-center justify-between h-[42px] px-4 bg-[#1A1A1A] flex-shrink-0">
            <span className="text-white/70 text-sm font-medium">{currentImg + 1} / {character.images.length}</span>
            <button className="flex items-center gap-1.5 text-white/70 text-sm hover:text-white transition-colors">
              <ImageIcon className="w-4 h-4" /> 이미지 선택 <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* 이미지 */}
          <div className="flex-1 relative overflow-hidden cursor-pointer" style={{ perspective: "1200px" }} onClick={() => flipToImage((currentImg + 1) % character.images.length)}>
            <img src={character.images[nextImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className={`absolute inset-0 ${isFlipping ? "page-flip-lr" : ""}`}>
              <img src={character.images[currentImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
              <div key={flashKey} className={`absolute inset-0 bg-white pointer-events-none ${flashKey > 0 ? "light-flash" : "opacity-0"}`} /> {/*260325 수정 — 페이지와 함께 넘어감*/}
            </div>
            <video data-fx="reveal-std" src="/webp/fx-premium.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
            <video data-fx="reveal-edge" src="/webp/fx-exclusive-edge.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
            <video data-fx="reveal-ex" src="/webp/fx-exclusive.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
            {/* 이미지별 배지 */}
            <div className="absolute top-3 left-3 z-20"> {/*260326 수정*/}
              <span className="text-[14px] font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: currentImg === 0 ? "rgba(59,35,10,.8)" : "rgba(16,37,23,.8)", borderColor: currentImg === 0 ? "rgba(139,105,20,0.3)" : "rgba(60,140,80,0.3)" }}><span className={currentImg === 0 ? "badge-text-premium" : "badge-text-ex"}>{currentImg === 0 ? "프리미엄" : "익스클루시브"}</span></span> {/*260326 수정*/}
            </div>
          </div>
        </div>

        {/* 중앙: 채팅 영역 */}
        <div className="flex-1 flex flex-col bg-[#1A1A1A] min-w-0">
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-hide">
            {chatMessages.map(renderMsg)}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t border-white/5 px-4 py-3 bg-[#1A1A1A]">
            <ModeBar className="mb-3" />
            <InputBar />
          </div>
        </div>

        {/* 우측: 프로필 사이드바 */}
        <div className="w-[260px] lg:w-[290px] bg-[#121212] border-l border-white/5 flex-shrink-0 overflow-y-auto scrollbar-hide px-5 py-6">
          <div className="flex flex-col items-center text-center mb-5">
            <img src={character.avatar} alt={character.name} className="w-20 h-20 rounded-full object-cover mb-3 outline outline-2 -outline-offset-2 outline-white/10" />
            <h2 className="text-lg font-bold text-white mb-1">{character.name}</h2>
            <p className="text-[13px] text-[#A3A3A3] leading-relaxed px-2">{character.quote}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {character.tags.map((t) => <span key={t} className="text-[11px] text-[#A3A3A3] bg-white/5 px-2 py-1 rounded-md border border-white/5 font-medium">{t}</span>)}
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-xl py-3 text-[14px] font-bold text-white hover:bg-[#222] transition-colors mb-5">
            <Lock className="w-4 h-4" /> 시크릿 컬렉션
          </button>
          <div className="flex items-center justify-center gap-4 text-[12px] text-[#A3A3A3] mb-6 pb-5 border-b border-white/5" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {character.views}회</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {character.chats}회</span>
            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {character.likes}</span>
          </div>
          <h3 className="text-[14px] font-bold text-white mb-2">소개</h3>
          <p className="text-[13px] text-[#A3A3A3] leading-relaxed">{character.bio}</p>
          <button className="text-[13px] text-[#A3A3A3] font-bold mt-2 hover:underline hover:text-white transition-colors">더보기</button>
        </div>
      </div>

      {/* ====== MOBILE — 이미지 배경 + 채팅 오버레이 ====== */}
      <div className="flex md:hidden flex-col flex-1 overflow-hidden">
        {/* 모바일 채팅 헤더 */}
        <div className="relative z-30 flex items-center justify-between h-[55px] px-3 bg-[#121212] flex-shrink-0 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <button className="p-1 text-[#A3A3A3]"><ChevronLeft className="w-5 h-5" /></button>
            <img src={character.avatar} alt={character.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-[14px] font-bold text-white">{character.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#261E0A] text-[#FACC15] px-2.5 py-1 rounded-full border border-[#EAB308]/20">
              <img src="/images/chatCoin.png" alt="coin" className="w-[16px] h-[16px]" />
              <span className="font-bold text-[13px]" style={{ fontVariantNumeric: "tabular-nums" }}>44,540</span>
            </div>
            <button className="p-1 text-[#A3A3A3]"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 전체 배경 이미지 (헤더 아래 영역) */}
        <div className="flex-1 relative overflow-hidden" style={{ perspective: "1200px" }} onClick={() => flipToImage((currentImg + 1) % character.images.length)}>
        {/* 다음 이미지 (뒤에 깔림) */}
        <img src={character.images[nextImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
        {/* 현재 이미지 (책장 넘기기) */}
        <div className={`absolute inset-0 ${isFlipping ? "page-flip-lr" : ""}`}>
          <img src={character.images[currentImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
          <div key={flashKey} className={`absolute inset-0 bg-white pointer-events-none ${flashKey > 0 ? "light-flash" : "opacity-0"}`} /> {/*260325 수정 — 페이지와 함께 넘어감*/}
        </div>
        <video data-fx="reveal-std" src="/webp/fx-premium.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
        <video data-fx="reveal-edge" src="/webp/fx-exclusive-edge.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
        <video data-fx="reveal-ex" src="/webp/fx-exclusive.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* 이미지별 배지 + 이미지 선택 */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between"> {/*260326 수정*/}
          <span className="text-[14px] font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: currentImg === 0 ? "rgba(59,35,10,.8)" : "rgba(16,37,23,.8)", borderColor: currentImg === 0 ? "rgba(139,105,20,0.3)" : "rgba(60,140,80,0.3)" }}><span className={currentImg === 0 ? "badge-text-premium" : "badge-text-ex"}>{currentImg === 0 ? "프리미엄" : "익스클루시브"}</span></span> {/*260326 수정*/}
          <button className="flex items-center gap-1.5 bg-[#4A3F38]/90 text-white/90 text-[13px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ImageIcon className="w-4 h-4" /> {currentImg + 1}/{character.images.length} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 눈 아이콘 — 고정 위치 */}
        <button className="absolute right-4 top-[45%] z-20 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Eye className="w-[18px] h-[18px] text-white/70" />
        </button>

        {/* 채팅 영역 — 하단 55%에서만 표시 */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] z-10 flex flex-col">
          {/* 채팅 메시지 (스크롤) */}
          <div className="flex-1 overflow-y-auto px-4 space-y-3 scrollbar-hide">
            {chatMessages.map((msg, i) => {
              if (msg.type === "narration") return (
                <p key={i} className="text-[13px] text-white/70 leading-relaxed text-center px-3 py-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,.6)" }}>{msg.content}</p>
              );
              if (msg.type === "character") return (
                <div key={i} className="bg-black/40 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 text-[13.5px] text-white/90 leading-relaxed max-w-[85%]">
                  {msg.content}
                </div>
              );
              return (
                <div key={i} className="flex items-end justify-end gap-1.5">
                  <div className="bg-[#EE2C39]/25 backdrop-blur-sm rounded-2xl rounded-tr-sm px-4 py-3 text-[13.5px] text-white leading-relaxed max-w-[75%]">
                    {msg.content}
                  </div>
                  <button className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Pencil className="w-3.5 h-3.5 text-white/50" />
                  </button>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* 하단 컨트롤 */}
          <div className="px-3 pb-2 pt-2">
            {/* 모드 토글 */}
            <div className="flex items-center gap-1.5 pb-2">
              <button className="p-2 text-white/50"><Sparkles className="w-[18px] h-[18px]" /></button>
              <button className="p-2 text-white/50"><Settings className="w-[18px] h-[18px]" /></button>
              <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold ${activeMode === "일상톡" ? "bg-white/15 text-white" : "text-white/50"}`} onClick={() => setActiveMode("일상톡")}><MessageCircle className="w-2.5 h-2.5" /> 일상톡</button>
              <button className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-bold ${activeMode === "설렘톡" ? "bg-[#EE2C39]/30 text-[#EE2C39]" : "text-white/50"}`} onClick={() => setActiveMode("설렘톡")}><Heart className="w-2.5 h-2.5 fill-current" /> 설렘톡</button>
            </div>
            {/* 입력창 */}
            <div className="flex items-center gap-2 pb-2">
              <input type="text" placeholder={`${character.name}에게 메시지 보내기...`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 bg-white/10 backdrop-blur-sm text-white text-sm placeholder-white/40 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20" />
              <button className="w-11 h-11 bg-[#EE2C39] rounded-full flex items-center justify-center flex-shrink-0 active:scale-95">
                <Mic className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        </div>{/* closes 이미지 배경 영역 */}
      </div>
    </div>
  );
}
