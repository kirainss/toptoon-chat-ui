"use client";

import { ChevronDown, ChevronLeft, Lock, Eye, MessageCircle, Heart, Pencil, Image as ImageIcon, MoreVertical } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react"; /*260406 추가*/
import chatPointPaw from "../../../public/json/chatPoint-paw.json"; /*260406 추가*/

const character = {
  name: "신아영",
  quote: "\"제발 임힘취요... 남들 보면 어쩌려고... 하아, 시키는 대로 다 할게요...\"",
  tags: ["#우니들", "#우산먼물리나들", "#신아영", "#클라카", "#글라피", "#노벨피아 원작"],
  views: "221,302", chats: "19,875", likes: "356",
  avatar: "/images/thumb-char-01.jpg",
  images: ["/images/img-chat-01.webp", "/images/img-chat-01.webp", "/images/img-chat-01.webp"], /*260331 수정 — 로얄 이미지 추가*/
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

const suggestedReplies = [
  { dialogue: "여기서 먹자. 네 것도 같이 준비해.", action: "찬잔을 받아들며 맞은편 자리를 턱짓했다." },
  { dialogue: "저녁은 됐어. 배가 안 고파서.", action: "서류를 펼치며 고개를 저었다." },
  { dialogue: "손이 왜 떨려? 지하에서 무리한 거 아니야?", action: "찻잔 위에 머뭇거린 손가락을 눈치채며 물었다." },
];

export default function ChatPage() {
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flashKey, setFlashKey] = useState(0); /*260325 추가*/
  const [activeMode, setActiveMode] = useState<"상황묘사" | "추천답장" | null>(null);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState(44540); /*260406 추가*/
  const [showDeduct, setShowDeduct] = useState(false); /*260406 추가*/
  const lottieDesktopRef = useRef<any>(null); /*260406 수정*/
  const lottieMobileRef = useRef<any>(null); /*260406 수정*/

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  /* 코인 버튼 클릭 시 10코인 차감 + 로티 재생 */ /*260406 추가*/
  const handleCoinClick = () => {
    [lottieDesktopRef, lottieMobileRef].forEach(ref => { if (ref.current) { ref.current.stop(); ref.current.play(); } }); /*260406 수정*/
    setShowDeduct(true);
    let c = coins;
    const iv = setInterval(() => {
      c -= 1;
      setCoins(c);
      if (c <= coins - 10) clearInterval(iv);
    }, 38);
    setTimeout(() => setShowDeduct(false), 1500);
  }; /*260406 추가*/

  /* fx 영상 재생 — reveal 전용 (로드 대기 포함) */ /*260325 수정*/
  const playFxGroup = (group: string) => {
    document.querySelectorAll<HTMLVideoElement>(`video[data-fx="${group}"]`).forEach((v) => {
      v.pause(); v.currentTime = 0; v.style.opacity = "1"; /*260325 수정*/
      v.playbackRate = 1.4; /*260325 수정*/
      const doPlay = () => { v.style.transition = "opacity 0.4s ease-out"; const p = v.play(); if (p) p.catch(() => { }); v.onended = () => { v.style.opacity = "0"; }; }; /*260325 수정 / 260326 fadeout 추가*/
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
    setTimeout(() => { if (targetIdx === 0) { playFxGroup("reveal-std"); } else if (targetIdx === 1) { playFxGroup("reveal-ex"); } else { playFxGroup("reveal-royal"); } }, 750); /*260331 수정 — 로얄 FX 추가*/
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

  /* 톡 모드 */
  const [talkMode, setTalkMode] = useState<"일상톡" | "설렘톡">("일상톡");
  /* 설정 팝업 */
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState<"작게" | "보통" | "크게">("보통");
  const [autoScroll, setAutoScroll] = useState(true);
  /* 상황추가 모달 */
  const [showSituationModal, setShowSituationModal] = useState(false);


  return (
    <div className="fixed inset-0 md:left-[260px] z-[55] flex flex-col overflow-hidden bg-[#121212]">
      {showSettings && <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />}
      {/* 상황추가 모달 */}
      {showSituationModal && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSituationModal(false)}>
          <div className="w-full sm:max-w-sm bg-[#1E1E22] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 pb-8 sm:pb-6" onClick={e => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[16px] font-bold text-white">서사 연습</span>
              <button onClick={() => setShowSituationModal(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] text-[#888] hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {/* 설명 */}
            <p className="text-[15px] font-bold text-white leading-relaxed mb-1.5"><span className="text-[#EE2C39]">* *</span> 사이에 아래와 같은 예시 문장을 입력하면,<br />원하는 대화 흐름을 유도할 수 있어요.</p>
            <p className="text-[13px] text-[#666] mb-5">나의 행동, 주변 상황, 감정을 자유롭게 적어보세요.</p>
            {/* 예시 카드 */}
            <div className="space-y-2 mb-6">
              {[
                { text: "*나리의 손을 꼭 잡으며 눈을 마주본다*", desc: "나리가 내 행동에 반응하며 대화가 이어져요" },
                { text: "*갑자기 문이 열리며 누군가 들어온다*", desc: "예상치 못한 상황이 전개돼요" },
                { text: "*부끄러워서 고개를 돌리며 귀가 빨개진다*", desc: "내 감정에 맞춰 분위기가 바뀌어요" },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3">
                  <p className="text-[14px] font-bold text-white mb-1">{item.text}</p>
                  <p className="text-[13px] text-[#666]">→ {item.desc}</p>
                </div>
              ))}
            </div>
            {/* 버튼 */}
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSituationModal(false)} className="flex-1 py-3.5 rounded-xl text-[15px] font-bold text-white bg-[#EE2C39] hover:opacity-90 transition-opacity">알겠어요!</button>
              <button onClick={() => setShowSituationModal(false)} className="text-[13px] text-[#555] hover:text-[#888] transition-colors whitespace-nowrap">다시 안 볼게요</button>
            </div>
          </div>
        </div>
      )}

      {/* ====== DESKTOP (헤더 full-width, 3-column max-width 센터 정렬) ====== */}
      <div className="hidden md:flex flex-col flex-1 overflow-hidden">

        {/* ====== DESKTOP 채팅 헤더 ====== */}
        <div className="flex items-center h-[52px] px-4 bg-[#121212] border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-[#A3A3A3] hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <img src={character.avatar} alt={character.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-[14px] font-bold text-white">{character.name}</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5">
              <div className="relative flex items-center gap-1.5 text-[#FACC15] px-3 py-1.5 rounded-full border border-[#EAB308]/40 cursor-pointer" style={{ background: 'linear-gradient(135deg, #3D2800, #5C3C00)' }} onClick={handleCoinClick}> {/*260407 수정*/}
                {showDeduct && <span className="coin-deduct-float">-10 ♥</span>} {/*260406 추가*/}
                <span className="relative w-[18px] h-[18px] flex-shrink-0"><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px]"><Lottie lottieRef={lottieDesktopRef} animationData={chatPointPaw} loop={false} autoplay={false} style={{ width: '100%', height: '100%' }} /></span></span> {/*260407 수정*/}
                <span className="font-bold text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>{coins.toLocaleString('en-US')}</span> {/*260406 수정*/}
              </div>
            </div>
            <button className="p-1.5 text-[#A3A3A3] hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* ====== DESKTOP 3-COLUMN ====== */}
        <div className="flex flex-1 overflow-hidden">
          {/* 이미지+채팅 — max-width 센터 정렬 */}
          <div className="flex-1 flex justify-center overflow-hidden min-w-0">
            <div className="flex max-w-[1440px] w-full overflow-hidden">

              {/* 좌측: 캐릭터 이미지 */}
              <div className="flex-1 max-w-[800px] flex flex-col bg-black">
                {/* 이미지 헤더 바 */}
                <div className="flex items-center justify-between h-[42px] px-4 bg-[#1A1A1A] flex-shrink-0">
                  <span className="text-white/70 text-sm font-medium">{currentImg + 1} / {character.images.length}</span>
                  <button className="flex items-center gap-1.5 text-white/70 text-sm hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" /> 이미지 선택 <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* 이미지 */}
                <div className="flex-1 relative overflow-hidden cursor-pointer isolate" style={{ perspective: "1200px" }} onClick={() => flipToImage((currentImg + 1) % character.images.length)}>
                  <img src={character.images[nextImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className={`absolute inset-0 ${isFlipping ? "page-flip-lr" : ""}`}>
                    <img src={character.images[currentImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                    <div key={flashKey} className={`absolute inset-0 bg-white pointer-events-none ${flashKey > 0 ? "light-flash" : "opacity-0"}`} /> {/*260325 수정 — 페이지와 함께 넘어감*/}
                  </div>
                  <video data-fx="reveal-std" src="/webp/fx-premium.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
                  <video data-fx="reveal-ex" src="/webp/fx-exclusive.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260327 수정 — edge 제거*/}
                  <video data-fx="reveal-royal" src="/webp/fx-royal.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260331 추가 — 로얄 FX*/}
                  {/* 이미지별 배지 */}
                  <div className="absolute top-3 left-3 z-20"> {/*260326 수정*/}
                    <span className="text-[14px] font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: currentImg === 0 ? "rgba(59,35,10,.8)" : currentImg === 1 ? "rgba(16,37,23,.8)" : "rgba(40,20,70,.85)", borderColor: currentImg === 0 ? "rgba(139,105,20,0.3)" : currentImg === 1 ? "rgba(60,140,80,0.3)" : "rgba(168,85,247,0.5)", boxShadow: currentImg === 2 ? "0 0 12px rgba(168,85,247,.35), inset 0 0 8px rgba(168,85,247,.1)" : "none" }}><span className={currentImg === 0 ? "badge-text-premium" : currentImg === 1 ? "badge-text-ex" : "badge-text-royal"}>{currentImg === 0 ? "프리미엄" : currentImg === 1 ? "익스클루시브" : "로얄"}</span></span> {/*260331 수정*/}
                  </div>
                </div>
              </div>

              {/* 중앙: 채팅 영역 */}
              <div className="flex-1 flex flex-col bg-[#1A1A1A] min-w-0 max-w-[720px]">
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-hide">
                  {chatMessages.map(renderMsg)}
                  <div ref={chatEndRef} />
                </div>
                {activeMode === "추천답장" && (
                  <div className="px-4 pt-3 pb-1 space-y-2 overflow-y-auto max-h-[260px] scrollbar-hide bg-[#1A1A1A]">
                    {suggestedReplies.map((reply, i) => (
                      <button key={i} onClick={() => { setInputValue(reply.dialogue); setActiveMode(null); }} className="w-full flex items-start gap-3 rounded-2xl px-4 py-3 text-left transition-colors group" style={{ border: '1px solid transparent', background: 'linear-gradient(#1a1f2e, #1a1f2e) padding-box, linear-gradient(135deg, #60A5FA, #A78BFA) border-box', boxSizing: 'border-box' as const }}>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                          <Pencil className="w-3.5 h-3.5 text-[#60A5FA]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-bold text-white leading-snug">"{reply.dialogue}"</p>
                          <p className="text-[12px] text-[#7A8FAA] italic leading-relaxed mt-0.5">{reply.action}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="px-4 pt-4 bg-[#1A1A1A]" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
                  <div className="flex flex-col rounded-2xl bg-[#212124] px-4 py-3">
                    {/* 상단: 톡 모드(좌) + 액션 버튼(우) */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        {/* 슬라이드 토글 */}
                        <div className="flex items-center h-7 p-0.5 rounded-full bg-white/[0.06] relative">
                          {/* 슬라이딩 thumb */}
                          <div className={`absolute top-0.5 h-[calc(100%-4px)] rounded-full transition-all duration-200 ${talkMode === "일상톡" ? "left-0.5 bg-[#1D3A5C] border border-[#60A5FA]/25" : "left-[50%] bg-[#3D1F2E] border border-[#F472B6]/25"}`}
                            style={{ width: 'calc(50% - 2px)' }} />
                          <button onClick={() => setTalkMode("일상톡")} className={`relative z-10 flex items-center gap-1 h-full px-2.5 rounded-full text-[12px] font-semibold transition-colors ${talkMode === "일상톡" ? "text-[#60A5FA]" : "text-[#999] hover:text-white"}`}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> 일상톡
                          </button>
                          <button onClick={() => setTalkMode("설렘톡")} className={`relative z-10 flex items-center gap-1 h-full px-2.5 rounded-full text-[12px] font-semibold transition-colors ${talkMode === "설렘톡" ? "text-[#F472B6]" : "text-[#999] hover:text-white"}`}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 설렘톡
                          </button>
                        </div>
                        <button className="w-6 h-6 flex items-center justify-center text-[#444] hover:text-[#777] transition-colors">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setActiveMode("상황묘사"); setShowSituationModal(true); }} className={`flex items-center gap-1 h-7 px-2.5 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 ${activeMode === "상황묘사" ? "bg-white/[0.15] text-white" : "bg-white/[0.07] text-[#999] hover:text-white hover:bg-white/[0.1]"}`}>
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.382" d="M8.195 2v12M3 5l10.39 6M3 11l10.39-6" /></svg><span>상황추가</span>
                        </button>
                        <button onClick={() => setActiveMode(v => v === "추천답장" ? null : "추천답장")} className="flex items-center gap-1 h-7 px-2.5 rounded-full text-[12px] font-bold transition-all flex-shrink-0" style={{ border: '1.5px solid transparent', background: `linear-gradient(${activeMode === "추천답장" ? "#1a1f2e" : "#111114"}, ${activeMode === "추천답장" ? "#1a1f2e" : "#111114"}) padding-box, linear-gradient(135deg, #60A5FA, #A78BFA) border-box`, boxSizing: 'border-box' }}>
                          <svg className="w-3 h-3 text-[#60A5FA]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><rect x="19.5" y="2" width="1" height="4" rx="0.5" /><rect x="18" y="3.5" width="4" height="1" rx="0.5" /><circle cx="4" cy="20" r="2" /></svg>
                          <span style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>추천답장</span>
                        </button>
                        <div className="relative">
                          <button onClick={() => setShowSettings(v => !v)} className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${showSettings ? "text-white" : "text-[#999] hover:text-white"}`}>
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.916 11.001a3.166 3.166 0 0 1 3.095 2.5h5.655l.135.014a.665.665 0 0 1 0 1.303l-.135.013h-5.655a3.166 3.166 0 0 1-6.19 0H3.334a.665.665 0 0 1 0-1.33h1.489a3.17 3.17 0 0 1 3.094-2.5m0 1.33a1.836 1.836 0 1 0 .001 3.671 1.836 1.836 0 0 0 0-3.67m4.167-9.663c1.52 0 2.79 1.072 3.095 2.5h1.488l.135.014a.665.665 0 0 1 0 1.303l-.135.013h-1.488a3.166 3.166 0 0 1-6.19 0H3.334a.665.665 0 0 1 0-1.33H8.99a3.166 3.166 0 0 1 3.094-2.5m0 1.33a1.835 1.835 0 1 0 0 3.67 1.835 1.835 0 0 0 0-3.67" /></svg>
                          </button>
                          {showSettings && (
                            <div className="absolute bottom-full right-0 mb-2 w-52 rounded-2xl bg-[#2A2A2E] border border-white/10 shadow-2xl p-4 z-50">
                              <div className="flex items-center gap-1.5 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#777]" aria-hidden="true"><path d="M12 4v16" /><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /><path d="M9 20h6" /></svg>
                                <p className="text-[11px] text-[#777] font-medium">글자 크기</p>
                              </div>
                              <div className="flex gap-1.5 mb-4">
                                {(["작게", "보통", "크게"] as const).map(s => (
                                  <button key={s} onClick={() => setFontSize(s)} className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${fontSize === s ? "bg-white/15 text-white" : "text-[#999] hover:text-white"}`}>{s}</button>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#777]" aria-hidden="true"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
                                  <span className="text-[13px] text-[#ccc]">자동 스크롤</span>
                                </div>
                                <button onClick={() => setAutoScroll(v => !v)} className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${autoScroll ? "bg-[#EE2C39]" : "bg-white/15"}`}>
                                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${autoScroll ? "left-[18px]" : "left-0.5"}`} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* 입력창 + 전송 */}
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder={`${character.name}에게 메시지 보내기...`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 min-w-0 bg-transparent text-white text-[14px] placeholder-[#555] py-3 focus:outline-none" />
                      <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 text-white hover:text-white/70 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]"><path fill="currentColor" d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* closes max-w-[1110px] */}
          </div>{/* closes justify-center wrapper */}

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
      </div>{/* closes hidden md:flex wrapper */}

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
            <div className="relative flex items-center gap-1 text-[#FACC15] px-2.5 py-1 rounded-full border border-[#EAB308]/40 cursor-pointer" style={{ background: 'linear-gradient(135deg, #3D2800, #5C3C00)' }} onClick={handleCoinClick}> {/*260407 수정*/}
              {showDeduct && <span className="coin-deduct-float">-10 ♥</span>} {/*260406 추가*/}
              <span className="relative w-[16px] h-[16px] flex-shrink-0"><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px]"><Lottie lottieRef={lottieMobileRef} animationData={chatPointPaw} loop={false} autoplay={false} style={{ width: '100%', height: '100%' }} /></span></span> {/*260407 수정*/}
              <span className="font-bold text-[13px]" style={{ fontVariantNumeric: "tabular-nums" }}>{coins.toLocaleString('en-US')}</span> {/*260406 수정*/}
            </div>
            <button className="p-1 text-[#A3A3A3]"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 전체 배경 이미지 (헤더 아래 영역) */}
        <div className="flex-1 relative overflow-hidden isolate" style={{ perspective: "1200px" }} onClick={() => flipToImage((currentImg + 1) % character.images.length)}>
          {/* 다음 이미지 (뒤에 깔림) */}
          <img src={character.images[nextImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
          {/* 현재 이미지 (책장 넘기기) */}
          <div className={`absolute inset-0 ${isFlipping ? "page-flip-lr" : ""}`}>
            <img src={character.images[currentImg]} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div key={flashKey} className={`absolute inset-0 bg-white pointer-events-none ${flashKey > 0 ? "light-flash" : "opacity-0"}`} /> {/*260325 수정 — 페이지와 함께 넘어감*/}
          </div>
          <video data-fx="reveal-std" src="/webp/fx-premium.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260326 수정*/}
          <video data-fx="reveal-ex" src="/webp/fx-exclusive.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260327 수정 — edge 제거*/}
          <video data-fx="reveal-royal" src="/webp/fx-royal.webm" muted playsInline preload="auto" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[2]" style={{ objectFit: "fill" }} /> {/*260331 추가 — 로얄 FX*/}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          {/* 이미지별 배지 + 이미지 선택 */}
          <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between"> {/*260326 수정*/}
            <span className="text-[12px] font-bold px-2.5 py-1 rounded-lg border" style={{ backgroundColor: currentImg === 0 ? "rgba(59,35,10,.8)" : currentImg === 1 ? "rgba(16,37,23,.8)" : "rgba(40,20,70,.85)", borderColor: currentImg === 0 ? "rgba(139,105,20,0.3)" : currentImg === 1 ? "rgba(60,140,80,0.3)" : "rgba(168,85,247,0.5)", boxShadow: currentImg === 2 ? "0 0 12px rgba(168,85,247,.35), inset 0 0 8px rgba(168,85,247,.1)" : "none" }}><span className={currentImg === 0 ? "badge-text-premium" : currentImg === 1 ? "badge-text-ex" : "badge-text-royal"}>{currentImg === 0 ? "프리미엄" : currentImg === 1 ? "익스클루시브" : "로얄"}</span></span> {/*260331 수정*/}
            <button className="flex items-center gap-1.5 bg-[#4A3F38]/90 text-white/90 text-[13px] font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm">
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
            {activeMode === "추천답장" && (
              <div className="px-3 pt-2 pb-1 space-y-2 overflow-y-auto max-h-[220px] scrollbar-hide">
                {suggestedReplies.map((reply, i) => (
                  <button key={i} onClick={() => { setInputValue(reply.dialogue); setActiveMode(null); }} className="w-full flex items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors group" style={{ border: '1px solid transparent', background: 'linear-gradient(#1a1f2e, #1a1f2e) padding-box, linear-gradient(135deg, #60A5FA, #A78BFA) border-box', boxSizing: 'border-box' as const }}>
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/10 transition-colors">
                      <Pencil className="w-3 h-3 text-[#60A5FA]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white leading-snug">"{reply.dialogue}"</p>
                      <p className="text-[11.5px] text-[#7A8FAA] italic leading-relaxed mt-0.5">{reply.action}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 하단 컨트롤 */}
            <div className="pt-1">
              <div className="flex flex-col px-4 pt-3" style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}>
                {/* 상단: 슬라이드 토글(좌) + 액션 버튼(우) */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center h-7 p-0.5 rounded-full bg-white/[0.06] relative flex-shrink-0">
                      <div className={`absolute top-0.5 h-[calc(100%-4px)] rounded-full transition-all duration-200 ${talkMode === "일상톡" ? "left-0.5 bg-[#1D3A5C] border border-[#60A5FA]/25" : "left-[50%] bg-[#3D1F2E] border border-[#F472B6]/25"}`} style={{ width: 'calc(50% - 2px)' }} />
                      <button onClick={() => setTalkMode("일상톡")} className={`relative z-10 flex items-center gap-1 h-full px-2.5 rounded-full text-[12px] font-semibold transition-colors ${talkMode === "일상톡" ? "text-[#60A5FA]" : "text-[#999] hover:text-white"}`}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> 일상톡
                      </button>
                      <button onClick={() => setTalkMode("설렘톡")} className={`relative z-10 flex items-center gap-1 h-full px-2.5 rounded-full text-[12px] font-semibold transition-colors ${talkMode === "설렘톡" ? "text-[#F472B6]" : "text-[#999] hover:text-white"}`}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 설렘톡
                      </button>
                    </div>
                    <button className="w-6 h-6 flex items-center justify-center text-[#999] hover:text-white transition-colors flex-shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setActiveMode("상황묘사"); setShowSituationModal(true); }} className={`flex items-center gap-1 h-7 px-2.5 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 ${activeMode === "상황묘사" ? "bg-white/[0.15] text-white" : "bg-white/[0.07] text-[#999] hover:text-white hover:bg-white/[0.1]"}`}>
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.382" d="M8.195 2v12M3 5l10.39 6M3 11l10.39-6" /></svg>
                      <span className="min-[451px]:hidden">상황</span><span className="hidden min-[451px]:inline">상황추가</span>
                    </button>
                    <button onClick={() => setActiveMode(v => v === "추천답장" ? null : "추천답장")} className="flex items-center gap-1 h-7 px-2.5 rounded-full text-[12px] font-bold transition-all flex-shrink-0" style={{ border: '1.5px solid transparent', background: `linear-gradient(${activeMode === "추천답장" ? "#1a1f2e" : "#111114"}, ${activeMode === "추천답장" ? "#1a1f2e" : "#111114"}) padding-box, linear-gradient(135deg, #60A5FA, #A78BFA) border-box`, boxSizing: 'border-box' }}>
                      <svg className="w-3 h-3 text-[#60A5FA]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><rect x="19.5" y="2" width="1" height="4" rx="0.5" /><rect x="18" y="3.5" width="4" height="1" rx="0.5" /><circle cx="4" cy="20" r="2" /></svg>
                      <span style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}><span className="min-[451px]:hidden">추천</span><span className="hidden min-[451px]:inline">추천답장</span></span>
                    </button>
                    <div className="relative">
                      <button onClick={() => setShowSettings(v => !v)} className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${showSettings ? "text-white" : "text-[#999] hover:text-white"}`}>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.916 11.001a3.166 3.166 0 0 1 3.095 2.5h5.655l.135.014a.665.665 0 0 1 0 1.303l-.135.013h-5.655a3.166 3.166 0 0 1-6.19 0H3.334a.665.665 0 0 1 0-1.33h1.489a3.17 3.17 0 0 1 3.094-2.5m0 1.33a1.836 1.836 0 1 0 .001 3.671 1.836 1.836 0 0 0 0-3.67m4.167-9.663c1.52 0 2.79 1.072 3.095 2.5h1.488l.135.014a.665.665 0 0 1 0 1.303l-.135.013h-1.488a3.166 3.166 0 0 1-6.19 0H3.334a.665.665 0 0 1 0-1.33H8.99a3.166 3.166 0 0 1 3.094-2.5m0 1.33a1.835 1.835 0 1 0 0 3.67 1.835 1.835 0 0 0 0-3.67" /></svg>
                      </button>
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 w-52 rounded-2xl bg-[#2A2A2E] border border-white/10 shadow-2xl p-4 z-50">
                          <div className="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#777]" aria-hidden="true"><path d="M12 4v16" /><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /><path d="M9 20h6" /></svg>
                            <p className="text-[11px] text-[#777] font-medium">글자 크기</p>
                          </div>
                          <div className="flex gap-1.5 mb-4">
                            {(["작게", "보통", "크게"] as const).map(s => (
                              <button key={s} onClick={() => setFontSize(s)} className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${fontSize === s ? "bg-white/15 text-white" : "text-[#999] hover:text-white"}`}>{s}</button>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#777]" aria-hidden="true"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
                              <span className="text-[13px] text-[#ccc]">자동 스크롤</span>
                            </div>
                            <button onClick={() => setAutoScroll(v => !v)} className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${autoScroll ? "bg-[#EE2C39]" : "bg-white/15"}`}>
                              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${autoScroll ? "left-[18px]" : "left-0.5"}`} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* 입력창 + 전송 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center backdrop-blur-[12px] bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.1)] rounded-3xl px-3">
                    <input type="text" placeholder={`${character.name}에게 메시지 보내기...`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 min-w-0 bg-transparent text-white text-[14px] placeholder-[#555] py-3 focus:outline-none" />
                  </div>
                  <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 text-[#111] transition-all shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]"><path fill="currentColor" d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{/* closes 이미지 배경 영역 */}
      </div>
    </div>
  );
}
