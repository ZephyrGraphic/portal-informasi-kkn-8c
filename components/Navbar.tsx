"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavDict {
  home: string;
  villageProfile: string;
  programs: string;
  team: string;
  logbook: string;
  gallery: string;
}

interface CommonDict {
  programName: string;
  groupName: string;
  contact: string;
}

export default function Navbar({ lang, dict, common }: { lang: "en" | "id"; dict: NavDict; common: CommonDict }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const NAV_LINKS = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.villageProfile, href: `/${lang}/village-profile` },
    { name: dict.programs, href: `/${lang}/programs` },
    { name: dict.team, href: `/${lang}/team` },
    { name: dict.logbook, href: `/${lang}/logbook` },
    { name: dict.gallery, href: `/${lang}/gallery` },
  ];

  const toggleLanguage = () => {
    const newLang = lang === "id" ? "en" : "id";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <Image 
              src="/logo-kkn-pangkalan-v2.png" 
              alt="KKN Desa Pangkalan Logo" 
              width={48} 
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-tighter text-white font-headline leading-tight">
                {common.programName}
              </span>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-tight">
                {common.groupName}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-headline tracking-tight font-bold text-[13px] uppercase">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 hover:opacity-80 pb-1 tracking-widest ${
                    isActive
                      ? "text-white border-b-2 border-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              {lang.toUpperCase()}
            </button>
            <Link href={`/${lang}/contact`} className="hidden sm:block">
              <button className="bg-white text-primary px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 hover:shadow-xl hover:-translate-y-0.5 duration-300">
                {common.contact}
              </button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-[#1F2916] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo-kkn-pangkalan-v2.png" 
                alt="KKN Desa Pangkalan Logo" 
                width={36} 
                height={36}
                className="w-8 h-8 object-contain drop-shadow-md"
              />
              <span className="font-headline font-black text-white text-[10px] uppercase tracking-widest leading-tight">
                {common.programName}
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-8">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-8 py-5 font-headline font-black text-xs uppercase tracking-[0.2em] transition-all duration-200 ${
                    isActive
                      ? "text-white bg-primary/20 border-r-4 border-primary"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Footer Actions */}
          <div className="p-8 border-t border-white/5 space-y-4">
            <Link href={`/${lang}/contact`} onClick={() => setMobileOpen(false)} className="block">
              <button className="w-full bg-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-primary/20">
                {common.contact}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
