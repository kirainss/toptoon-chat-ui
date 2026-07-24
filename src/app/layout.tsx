import type { Metadata } from "next";
import "./globals.css";
import {
  Home,
  Compass,
  MessageCircle,
  Heart,
  Grid,
  Settings,
  ExternalLink,
  Search,
  Menu,
  User,
  Send
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Toptoon 聊天",
  description: "TOPTOON CHAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NavItems = [
    { icon: Home, label: "首页", href: "/" },
    { icon: Compass, label: "探索", href: "/new" },
    { icon: MessageCircle, label: "我的聊天", href: "/chat" },
    { icon: Heart, label: "收藏夹", href: "#" },
    { icon: Grid, label: "收藏集", href: "/collection" },
    { icon: Settings, label: "设置", href: "#" },
  ];

  const recentChats = [
    { name: "徐娜莉", msg: "她像是被吓到般微微睁大眼睛...", img: "/images/thumb-char-05.jpg" },
    { name: "金佳乙", msg: "她身体僵住，双腿微微发颤...", img: "/images/thumb-char-02.jpg" },
    { name: "申雅英", "msg": "她用很轻的声音蜷起身体...", img: "/images/thumb-char-01.jpg" },
    { name: "裴贤珠", msg: "她轻轻侧过腰，语气变得柔和...", img: "/images/thumb-char-04.jpg" },
  ];

  return (
    <html lang="zh-CN" className="dark scroll-smooth">
      <body className="bg-[#121212] text-slate-100 antialiased font-sans">
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="lazyOnload" />
        <div className="flex h-[100dvh] overflow-hidden bg-[#0A0A0A]">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-[260px] bg-[#0A0A0A] border-r border-white/10 h-full py-1 flex-shrink-0 relative z-50 overflow-y-auto scrollbar-hide">
            <Link href="/" className="px-6">
              {/* Logo */}
              <img src="/images/logo/logo.svg" alt="TOPTOON CHAT" className="h-[98px]" />
            </Link>

            <nav className="space-y-1 px-3">
              {NavItems.slice(0, 2).map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-3 py-3 rounded-lg font-medium transition-colors ${idx === 0 ? "text-white bg-white/5" : "text-[#A3A3A3] hover:text-white hover:bg-white/5"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 px-6 mb-2">
              <span className="text-[11px] font-medium text-[#737373]">我的页面</span>
            </div>
            <nav className="space-y-1 px-3 mb-6">
              {NavItems.slice(2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 px-3 py-3 rounded-lg font-medium text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="px-3 mb-6">
              <Link href="#" className="flex items-center gap-4 px-3 py-3 rounded-lg font-medium text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-colors border-t border-white/5 pt-5 mt-2">
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm">前往 Toptoon</span>
              </Link>
            </div>

            <div className="mt-2 px-6 mb-2">
              <span className="text-[11px] font-medium text-[#737373]">最近对话</span>
            </div>
            <div className="px-3 pb-8">
              {recentChats.map((chat) => (
                <Link href="#" key={chat.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={chat.img} alt={chat.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[13px] font-bold text-[#E5E5E5] group-hover:text-white truncate">{chat.name}</div>
                    <div className="text-[11px] text-[#737373] truncate">{chat.msg}</div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

          {/* Main Content wrapper */}
          <div className="flex-1 flex flex-col h-full bg-[#121212] overflow-hidden relative">

            {/* Header (Desktop + Mobile) */}
            <header className="hidden md:flex h-[68px] md:h-[70px] w-full items-center justify-between px-4 md:px-8 bg-[#121212]/95 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
              {/* Mobile Left */}
              <div className="md:hidden flex items-center gap-2">
                <button className="text-white p-1"><Menu className="w-6 h-6" /></button>
                <img src="/images/logo/logo.svg" alt="TOPTOON CHAT" className="h-[60px]" />
              </div>

              {/* Desktop Left (Hamburger only) */}
              <div className="hidden md:flex items-center">
                <button className="text-white hover:text-[#EE2C39] transition-colors"><Menu className="w-6 h-6" /></button>
              </div>

              {/* Desktop Search Center */}
              <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                <Search className="w-4 h-4 text-[#737373] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="搜索角色、标签、作品..."
                  className="w-full bg-[#1A1A1A] text-sm text-white placeholder-[#737373] rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2A2A2A] text-[#A3A3A3] text-[10px] px-1.5 py-0.5 rounded font-mono">CRTL K</div>
              </div>

              {/* Right Side (Coins & Mobile Icons) */}
              <div className="flex items-center gap-4">
                <button className="md:hidden text-white"><Search className="w-5 h-5" /></button>
                <div className="flex items-center gap-1.5 bg-[#261E0A] text-[#FACC15] px-3 py-1.5 rounded-full border border-[#EAB308]/20">
                  <img src="/images/chatCoin.png" alt="coin" className="w-[18px] h-[18px]" />
                  <span className="font-bold text-sm">21,150</span>
                </div>
              </div>
            </header>

            {/* Scrollable Page Content */}
            <main className="flex-1 overflow-y-auto pb-24 md:pb-10 scrollbar-hide">
              {children}
            </main>
          </div>

          {/* Mobile Bottom Tab Bar */}
          <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0A0A0A] border-t border-white/5 flex justify-around items-center pt-2 pb-[env(safe-area-inset-bottom,1rem)] z-50">
            {[
              { icon: Home, label: "首页", href: "/" },
              { icon: Compass, label: "探索", href: "/new" },
              { icon: Send, label: "聊天", href: "/chat" },
              { icon: User, label: "资料", href: "#" }
            ].map((item, i) => (
              <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 p-2 ${i === 0 ? "text-white" : "text-[#737373]"}`}>
                <item.icon className={`w-5 h-5 ${i === 0 && "fill-current"}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </body>
    </html>
  );
}
