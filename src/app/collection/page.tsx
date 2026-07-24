"use client";

import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CollectionPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const characters = [
    { id: 1, name: "申雅英", count: 3, img: "/images/thumb-char-01.jpg", portrait: "/images/thumb-char-01.jpg" },
    { id: 2, name: "尹慧允", count: 1, img: "/images/thumb-char-02.jpg", portrait: "/images/thumb-char-02.jpg" },
    { id: 3, name: "韩娜莉", count: 10, img: "/images/thumb-char-03.jpg", portrait: "/images/thumb-char-03.jpg" },
    { id: 4, name: "金佳乙", count: 5, img: "/images/thumb-char-default-07.jpg", portrait: "/images/thumb-char-default-07.jpg" },
    { id: 5, name: "徐娜莉", count: 3, img: "/images/thumb-char-05.jpg", portrait: "/images/thumb-char-05.jpg" },
    { id: 6, name: "裴贤珠", count: 5, img: "/images/thumb-char-04.jpg", portrait: "/images/thumb-char-04.jpg" },
    { id: 7, name: "韩秀珍", count: 1, img: "/images/thumb-char-default-08.jpg", portrait: "/images/thumb-char-default-08.jpg" },
    { id: 8, name: "张善英", count: 6, img: "/images/thumb-char-flip-07.jpg", portrait: "/images/thumb-char-flip-07.jpg" },
    { id: 9, name: "恩惠", count: 1, img: "/images/thumb-char-flip-08.jpg", portrait: "/images/thumb-char-flip-08.jpg" },
  ];

  const totalImages = characters.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className={`w-full max-w-[1232px] mx-auto px-5 md:px-8 lg:px-10 py-10 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-[28px] md:text-[32px] font-bold text-white tracking-tight mb-2">收藏集</h1>
        <p className="text-[14px] text-[#A3A3A3] font-medium mb-6">查看你在聊天中解锁的插画</p>
        
        <div className="text-[13px] text-[#737373] font-medium">
          角色 {characters.length} 名 · 共 {totalImages} 张
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {characters.map((char, index) => (
          <Link href={`/collection/${char.id}`} key={char.id}>
            <div 
              className="stagger-item group relative aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#1A1A1A] cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              {/* Background Cover */}
              <img 
                src={char.img} 
                alt={char.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Gradient overlay for readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Bottom Info Banner */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5 z-10">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 shadow-md group-hover:border-white/50 transition-colors">
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white leading-tight mb-0.5 shadow-black drop-shadow-md">{char.name}</span>
                  <div className="flex items-center gap-1 text-[#A3A3A3] text-[11px] font-medium drop-shadow-md group-hover:text-white transition-colors">
                    <ImageIcon className="w-3 h-3" />
                    <span>{char.count} 张</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
