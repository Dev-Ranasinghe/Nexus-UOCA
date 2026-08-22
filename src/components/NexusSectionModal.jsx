import React, { useEffect, useRef } from "react";
import {
  IoClose,
  IoShieldCheckmarkSharp,
  IoTrophySharp,
  IoWaterSharp,
  IoHardwareChipSharp,
  IoBookSharp,
  IoDownloadOutline,
} from "react-icons/io5";
import { FaPlay, FaGamepad, FaMobileAlt, FaDesktop } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { HiSparkles } from "react-icons/hi2";

export default function NexusSectionModal({ isOpen, onClose, activeTab, setActiveTab }) {
  const tabRefs = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-scroll active tab button into center view when active tab changes or modal opens
  useEffect(() => {
    if (isOpen && activeTab && tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: "tournament", mobileLabel: "Overview", desktopLabel: "The Tournament" },
    { id: "valorant", mobileLabel: "Valorant", desktopLabel: "Valorant" },
    { id: "pubg", mobileLabel: "PUBG Mobile", desktopLabel: "PUBG Mobile" },
    { id: "format", mobileLabel: "Format", desktopLabel: "Tournament Format" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn overscroll-contain"
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col w-full max-w-6xl h-[95dvh] sm:h-[90vh] max-h-[95dvh] sm:max-h-[92vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 bg-[#09090e]/95 text-white shadow-2xl">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 sm:px-6 sm:py-3.5 bg-black/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <img src="/img/Leo Logo.png" alt="Leo Logo" className="size-6 sm:size-9 rounded-full object-cover border border-white/20 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-zentry text-xs sm:text-lg md:text-xl font-bold uppercase tracking-wider text-yellow-300 block truncate">
                NEXUS: Arena of Victory
              </span>
              <p className="text-[8px] sm:text-xs text-blue-100/60 uppercase tracking-widest font-general truncate">
                Official Tournament Hub
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center size-7 sm:size-9 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-200 shrink-0 ml-1"
            aria-label="Close modal"
          >
            <IoClose className="size-4 sm:size-6" />
          </button>
        </div>

        {/* Modal Tab Navigation Bar */}
        <div className="relative border-b border-white/10 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto px-2.5 py-1.5 sm:px-4 sm:py-2 no-scrollbar touch-pan-x scroll-smooth">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/40"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                  <span className="hidden sm:inline">{tab.desktopLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 sm:px-6 sm:py-6 md:px-8 md:py-8 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-transparent touch-pan-y overscroll-contain">
          
          {/* TAB 1: THE TOURNAMENT */}
          {activeTab === "tournament" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Media Teaser Banner */}
              <div className="relative w-full h-36 sm:h-64 md:h-80 rounded-lg sm:rounded-2xl overflow-hidden border border-white/10 group">
                <video autoPlay loop muted playsInline className="absolute inset-0 size-full object-cover opacity-60">
                  <source src="/videos/feature-1.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/40 to-transparent flex flex-col justify-end p-3 sm:p-6 md:p-8">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 text-[9px] sm:text-xs font-semibold uppercase tracking-widest w-fit mb-1 sm:mb-2">
                    <FaPlay className="text-[8px] sm:text-[10px]" /> Official Teaser
                  </div>
                  <h1 className="font-zentry text-xl sm:text-4xl md:text-6xl font-black uppercase text-white tracking-wide leading-tight">
                    THE TOURNAMENT
                  </h1>
                  <p className="text-[11px] sm:text-sm text-gray-300 max-w-2xl font-circular-web line-clamp-2 sm:line-clamp-none">
                    Everything you need to know about NEXUS: Arena of Victory. A digital battlefield where your passion for gaming directly impacts lives across Sri Lanka.
                  </p>
                </div>
              </div>

              {/* 2-Column Deep Dive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                
                {/* NEXUS E-Sports */}
                <div className="flex flex-col justify-between p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-br from-violet-950/40 to-black/60 border border-violet-500/30 hover:border-violet-400/60 transition-all duration-300">
                  <div>
                    <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-violet-400 font-bold block mb-1 sm:mb-2">
                      THE DIGITAL BATTLEFIELD
                    </span>
                    <h2 className="font-zentry text-xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-2 sm:mb-4">
                      NEXUS E-SPORTS
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-circular-web">
                      NEXUS is a high-yield, purely digital fundraising e-sports championship capitalizing on the highly competitive gaming culture in Sri Lanka. Organized by the <strong>LEO Club of UOC Alumni</strong>, the tournament brings together top-tier talent across PC and Mobile platforms.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-2 sm:mt-3 font-circular-web">
                      We maximize youth engagement while completely eliminating physical event overheads. This ensures maximum efficiency, featuring live stream broadcasts, zero-tolerance anti-cheat protocols, and strict competitive integrity.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-6">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-violet-200">
                      <HiSparkles className="text-violet-400 shrink-0" /> Live Broadcasting
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-violet-200">
                      <IoShieldCheckmarkSharp className="text-violet-400 shrink-0" /> Anti-Cheat Enforced
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-violet-200">
                      <IoTrophySharp className="text-violet-400 shrink-0" /> Elite Competition
                    </span>
                  </div>
                </div>

                {/* Project Diyawara */}
                <div className="flex flex-col justify-between p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-br from-pink-950/40 to-black/60 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-300">
                  <div>
                    <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-pink-400 font-bold block mb-1 sm:mb-2">
                      100% CHARITY FUNDRAISER
                    </span>
                    <h2 className="font-zentry text-xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-2 sm:mb-4">
                      PROJECT DIYAWARA
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-circular-web">
                      This isn't just about the competition—it's about saving lives. Rural communities in Sri Lanka's dry zones, specifically <strong>Anuradhapura and Polonnaruwa</strong>, face severe hardships due to limited access to clean, safe drinking water.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-2 sm:mt-3 font-circular-web">
                      <strong>100% of net profits</strong> from NEXUS registration fees directly finance Project Diyawara. By entering the lobby, you are funding clean water system upgrades, vital well rehabilitation, filtration installations, and hygiene education workshops.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-6">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-pink-200">
                      <IoWaterSharp className="text-pink-400 shrink-0" /> Clean Water Systems
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-pink-200">
                      <IoHardwareChipSharp className="text-pink-400 shrink-0" /> Well Rehabilitation
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs text-pink-200">
                      <IoBookSharp className="text-pink-400 shrink-0" /> Safe Hygiene Education
                    </span>
                  </div>
                </div>

              </div>

              {/* Arenas Navigation Grid */}
              <div className="p-3.5 sm:p-6 rounded-lg sm:rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-zentry text-lg sm:text-2xl font-black uppercase text-center mb-3 sm:mb-6 text-yellow-400">
                  Choose Your Arena
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div
                    onClick={() => setActiveTab("valorant")}
                    className="cursor-pointer group p-3 sm:p-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-950/30 to-black border border-red-500/30 hover:border-red-500 transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-red-400 font-bold uppercase tracking-wider block">PC GAMING • 5V5</span>
                      <h4 className="font-zentry text-lg sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">VALORANT</h4>
                    </div>
                    <TiLocationArrow className="size-5 sm:size-6 text-red-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>

                  <div
                    onClick={() => setActiveTab("pubg")}
                    className="cursor-pointer group p-3 sm:p-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-950/30 to-black border border-sky-500/30 hover:border-sky-500 transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-sky-400 font-bold uppercase tracking-wider block">MOBILE GAMING • DUO BR</span>
                      <h4 className="font-zentry text-lg sm:text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">PUBG MOBILE</h4>
                    </div>
                    <TiLocationArrow className="size-5 sm:size-6 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </div>

              {/* Typography Banner */}
              <div className="p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-black/60 border border-white/10 text-center space-y-1 sm:space-y-2">
                <p className="font-zentry text-sm sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-white uppercase leading-snug">
                  THIS ISN'T JUST A TOURNAMENT. IT'S WHERE RIVALRIES ARE BORN.
                </p>
                <p className="font-zentry text-xs sm:text-xl md:text-2xl font-bold text-violet-400 uppercase leading-snug">
                  WHERE EVERY ROUND MATTERS. WHERE TEAMWORK BECOMES YOUR GREATEST WEAPON.
                </p>
                <p className="font-circular-web text-[9px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-widest pt-0.5">
                  WHERE PRESSURE CREATES CHAMPIONS. AND WHERE YOUR LEGACY BEGINS.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: VALORANT */}
          {activeTab === "valorant" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Valorant Header Card */}
              <div className="relative p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-r from-red-950/60 via-black to-black border border-red-500/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-3">
                      <FaDesktop className="text-[9px] sm:text-xs shrink-0" /> Featured PC Game • 5v5 Tactical
                    </span>
                    <h1 className="font-zentry text-2xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wide">
                      VALORANT
                    </h1>
                    <p className="text-[11px] sm:text-sm text-gray-300 mt-1 sm:mt-2 font-circular-web">
                      NEXUS: Arena of Victory Official 5v5 Tactical Rulebook • Organized by LEO Club of UOC Alumni (District 306 D1)
                    </p>
                  </div>
                  <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end p-2.5 sm:p-4 rounded-lg bg-red-950/40 border border-red-500/30 shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest block">Community Event</span>
                    <span className="font-zentry text-xl sm:text-3xl font-bold text-red-400">Open to All</span>
                  </div>
                </div>
              </div>

              {/* Valorant Intro Box */}
              <div className="p-3.5 sm:p-6 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed font-circular-web space-y-1.5 sm:space-y-2">
                <p className="font-semibold text-white">
                  Official Tournament Rules & Player Regulations:
                </p>
                <p>
                  To ensure a fair and smooth competition, all teams must adhere strictly to the rulebook. Deliberately exploiting loopholes or disregarding admin instructions will result in severe penalties or immediate disqualification.
                </p>
              </div>

              {/* 6 Rules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                
                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    1. Eligibility & Roster
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Roster:</strong> Minimum 5 starting players + 1 optional sub (max 6).</li>
                    <li><strong className="text-white">Accounts:</strong> Valid Riot IDs registered prior to tournament start.</li>
                    <li><strong className="text-white">Anti-Smurf:</strong> Strictly no ringing or playing on another player's Riot account.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    2. Match Settings
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Mode:</strong> Standard 5v5 • Tournament Mode ON</li>
                    <li><strong className="text-white">Overtime:</strong> Win by Two</li>
                    <li><strong className="text-white">Server:</strong> Singapore (Default) or Mumbai (if both teams agree)</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    3. Map Veto Protocol
                  </h3>
                  <div className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <p><strong className="text-white">Bo1 Veto:</strong> Team A Ban 1 ➔ Team B Ban 2 ➔ Team A Ban 1 ➔ Team B Ban 1 ➔ Team A Pick Map (Team B Side Choice).</p>
                    <p><strong className="text-white">Bo3 Veto:</strong> Team A Ban 1 ➔ Team B Ban 1 ➔ Team A Pick M1 ➔ Team B Pick M2 ➔ Team B Ban 1 ➔ Team A Pick M3.</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    4. Punctuality & Pauses
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Check-in:</strong> 15 mins prior on Discord.</li>
                    <li><strong className="text-white">Grace Period:</strong> 15 mins max before walkover.</li>
                    <li><strong className="text-white">Tech Pause:</strong> Max 10 mins per map during buy phase.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    5. Integrity & Vanguard
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Vanguard:</strong> Must be running. Vanguard ban = instant team DQ.</li>
                    <li><strong className="text-white">Zero Tolerance:</strong> Hacking, bug exploits, or collusion prohibited.</li>
                    <li><strong className="text-white">Conduct:</strong> Toxicity or harassment leads to immediate ban.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-red-500/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-red-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    6. Results & Disputes
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Submission:</strong> Winning captain posts screenshot to <code className="break-all">#match-results</code>.</li>
                    <li><strong className="text-white">Disputes:</strong> File Discord ticket within 15 mins with clip/media proof.</li>
                  </ul>
                </div>

              </div>

              {/* Competitive Map Pool Badges */}
              <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="font-zentry text-sm sm:text-lg font-bold uppercase text-white mb-2 sm:mb-3">
                  Official Active Map Pool
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {["Abyss", "Ascent", "Breeze", "Haven", "Lotus", "Split", "Sunset"].map((map) => (
                    <span key={map} className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg bg-red-950/40 border border-red-500/30 text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">
                      {map}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Rulebook CTA */}
              <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-2xl bg-gradient-to-r from-red-950/40 to-black border border-red-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-zentry text-base sm:text-2xl font-bold text-white uppercase">OFFICIAL VALORANT RULEBOOK PDF</h4>
                  <p className="text-xs text-gray-400 font-circular-web">Download the complete printable PDF for your roster.</p>
                </div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSck-1Jp0XFg0dI_cJ2RCS_pKBD5AdeGLvqFIWQV3m-pxUDI6g/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-zentry uppercase tracking-wider text-xs sm:text-sm transition-all text-center shrink-0"
                >
                  <IoDownloadOutline className="size-4 shrink-0" /> Download / Register Now
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: PUBG MOBILE */}
          {activeTab === "pubg" && (
            <div className="space-y-4 sm:space-y-6">
              {/* PUBG Header Card */}
              <div className="relative p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-r from-sky-950/60 via-black to-black border border-sky-500/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 text-[9px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-3">
                      <FaMobileAlt className="text-[9px] sm:text-xs shrink-0" /> Featured Mobile Game • Duo BR
                    </span>
                    <h1 className="font-zentry text-2xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wide">
                      PUBG MOBILE
                    </h1>
                    <p className="text-[11px] sm:text-sm text-gray-300 mt-1 sm:mt-2 font-circular-web">
                      NEXUS Official Duo (Battle Royale) Rulebook • Organized by LEO Club of UOC Alumni (District 306 D1)
                    </p>
                  </div>
                  <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end p-2.5 sm:p-4 rounded-lg bg-sky-950/40 border border-sky-500/30 shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest block">Community Event</span>
                    <span className="font-zentry text-xl sm:text-3xl font-bold text-sky-400">Open to All</span>
                  </div>
                </div>
              </div>

              {/* STRICT Device Warning Banner */}
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-400/40 flex items-start gap-2.5 sm:gap-4">
                <div className="p-2 sm:p-2.5 rounded-full bg-sky-400/20 text-sky-400 font-bold shrink-0 mt-0.5 sm:mt-0">
                  <FaGamepad className="size-4 sm:size-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-sky-400 block mb-0.5">
                    STRICT DEVICE REGULATION
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 font-circular-web leading-relaxed">
                    Play is strictly restricted to mobile phones running Android or iOS. <strong>NO Emulators, NO Tablets, NO Controllers, Keyboards, or Mice.</strong> Violators face instant team disqualification.
                  </p>
                </div>
              </div>

              {/* 6 Rules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                
                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    1. Roster & Team
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Format:</strong> Exactly 2 starting players + 1 optional sub (max 3).</li>
                    <li><strong className="text-white">Captain:</strong> Designated captain responsible for Discord comms.</li>
                    <li><strong className="text-white">Gamer Tags:</strong> Clean, non-offensive tags only.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    2. Devices & Hardware
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Mobile Only:</strong> Handheld Android / iOS smartphones only.</li>
                    <li><strong className="text-white">Prohibited:</strong> PC emulators, tablets/iPads, triggers, adapters.</li>
                    <li><strong className="text-white">Penalty:</strong> Immediate team disqualification.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    3. Match Format
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Structure:</strong> Exactly ONE (1) Battle Royale Match.</li>
                    <li><strong className="text-white">Map:</strong> Designated map (e.g., Erangel) announced prior.</li>
                    <li><strong className="text-white">NO POINT SYSTEM:</strong> Pure survival placement + eliminations.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    4. Match Results
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">1st Place:</strong> Winner Winner Chicken Dinner (#1 Survival).</li>
                    <li><strong className="text-white">2nd Place:</strong> #2 Survival Placement.</li>
                    <li><strong className="text-white">Most Kills:</strong> Highest combined team eliminations.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    5. Lobby & Screenshots
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Lobby:</strong> Credentials distributed via Discord.</li>
                    <li><strong className="text-white">Proof Required:</strong> Final result screenshot must be uploaded for verification and recordkeeping.</li>
                  </ul>
                </div>

                <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 hover:border-sky-400/50 transition-colors">
                  <h3 className="font-zentry text-sm sm:text-xl font-bold text-sky-400 uppercase mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-white/10">
                    6. Integrity & Fair Play
                  </h3>
                  <ul className="text-xs text-gray-300 space-y-1 sm:space-y-2 font-circular-web">
                    <li><strong className="text-white">Anti-Cheat:</strong> No wallhacks, aimbots, or modified APKs.</li>
                    <li><strong className="text-white">Collusion:</strong> Teaming in-game with opposing duos is forbidden.</li>
                    <li><strong className="text-white">Sportsmanship:</strong> Zero tolerance for toxic chat.</li>
                  </ul>
                </div>

              </div>

              {/* Download Rulebook CTA */}
              <div className="p-3.5 sm:p-5 rounded-lg sm:rounded-2xl bg-gradient-to-r from-sky-950/40 to-black border border-sky-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-zentry text-base sm:text-2xl font-bold text-white uppercase">OFFICIAL PUBG MOBILE RULEBOOK PDF</h4>
                  <p className="text-xs text-gray-400 font-circular-web">Download the complete printable PDF for your duo.</p>
                </div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSck-1Jp0XFg0dI_cJ2RCS_pKBD5AdeGLvqFIWQV3m-pxUDI6g/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 text-black font-zentry uppercase tracking-wider text-xs sm:text-sm font-bold transition-all text-center shrink-0"
                >
                  <IoDownloadOutline className="size-4 shrink-0" /> Download / Register Now
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: TOURNAMENT FORMAT */}
          {activeTab === "format" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-gradient-to-r from-violet-950/50 via-black to-black border border-white/10">
                <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-yellow-400 block mb-1">
                  // TOURNAMENT BLUEPRINT
                </span>
                <h1 className="font-zentry text-2xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wide">
                  TOURNAMENT FORMAT
                </h1>
                <p className="text-[11px] sm:text-sm text-gray-300 mt-1 sm:mt-2 font-circular-web max-w-2xl leading-relaxed">
                  The structure, stages, and map protocols. Everything you need to know about how champions climb the ranks in NEXUS.
                </p>
              </div>

              {/* Valorant Blueprint */}
              <div className="p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-black/60 border border-red-500/30 space-y-3 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-4">
                  <h2 className="font-zentry text-xl sm:text-3xl font-black text-red-500 uppercase">VALORANT (5v5 Knockout)</h2>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">Single Elimination</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                  <div className="p-3 sm:p-5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/10">
                    <h3 className="font-zentry text-sm sm:text-xl font-bold text-white uppercase mb-1.5 sm:mb-2">Knockout Stage Progression</h3>
                    <p className="text-[11px] sm:text-xs text-gray-300 font-circular-web leading-relaxed mb-2.5 sm:mb-3">
                      Conducting in a high-stakes single-elimination bracket where direct matches dictate advancement.
                    </p>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-red-950/30 border border-red-500/20 text-xs font-bold text-red-300 space-y-1">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-red-300">
                        <span>Round of 16</span>
                        <span className="text-gray-500">➔</span>
                        <span>Quarterfinals</span>
                        <span className="text-gray-500">➔</span>
                        <span>Semifinals</span>
                        <span className="text-gray-500">➔</span>
                        <span>Grand Final</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 font-normal leading-normal pt-1">Early rounds: Best of 1 (Bo1) | Quarterfinals to Final: Best of 3 (Bo3)</p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/10">
                    <h3 className="font-zentry text-sm sm:text-xl font-bold text-white uppercase mb-1.5 sm:mb-2">Active Map Pool (7 Maps)</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                      {["Abyss", "Ascent", "Breeze", "Haven", "Lotus", "Split", "Sunset"].map((m) => (
                        <span key={m} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-white/10 text-[10px] sm:text-xs text-white uppercase font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Veto Visual Steps */}
                <div className="space-y-2.5 sm:space-y-4 pt-1 sm:pt-2">
                  <h3 className="font-zentry text-sm sm:text-lg font-bold text-white uppercase">Discord Veto Order Flow</h3>
                  
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/80 border border-white/10 space-y-1.5 sm:space-y-2">
                    <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider block">BO1 VETO FLOW</span>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team A Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team B Ban 2</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team A Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team B Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-violet-900/80 border border-violet-500/40 text-violet-200 font-semibold">Team A Pick Map (Team B Side)</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/80 border border-white/10 space-y-1.5 sm:space-y-2">
                    <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider block">BO3 VETO FLOW (Quarterfinals+)</span>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team A Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team B Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-violet-900/80 border border-violet-500/40 text-violet-200 font-semibold">Team A Pick M1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-violet-900/80 border border-violet-500/40 text-violet-200 font-semibold">Team B Pick M2</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-semibold">Team B Ban 1</span>
                      <span className="text-gray-500">➔</span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-violet-900/80 border border-violet-500/40 text-violet-200 font-semibold">Team A Pick M3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PUBG Mobile Blueprint */}
              <div className="p-3.5 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl bg-black/60 border border-sky-500/30 space-y-2.5 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-4">
                  <h2 className="font-zentry text-xl sm:text-3xl font-black text-sky-400 uppercase">PUBG MOBILE (Single Match BR)</h2>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">Duo Battle Royale</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-circular-web leading-relaxed">
                  The PUBG Mobile Duo tournament eliminates multi-match cumulative point systems for intense execution. Everything rides on a single performance in <strong>ONE (1) single Battle Royale match</strong> (Erangel).
                </p>
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-sky-200 font-bold space-y-1">
                  <p>NO POINT SYSTEM TABLE • Survival Placement + Elimination Count in Single Drop dictates Champions.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer / Quick Action Bar */}
        <div className="flex items-center justify-between gap-2.5 border-t border-white/10 px-3 py-2.5 sm:px-6 sm:py-3.5 bg-black/60 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 font-circular-web min-w-0 flex-1">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Organized by LEO Club of UOC Alumni • Project Diyawara Fundraiser</span>
          </div>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSck-1Jp0XFg0dI_cJ2RCS_pKBD5AdeGLvqFIWQV3m-pxUDI6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-zentry text-[11px] sm:text-sm uppercase tracking-wider font-bold transition-all shadow-lg shadow-violet-600/30 shrink-0"
          >
            Register <span className="hidden sm:inline">Now</span> <TiLocationArrow className="size-3.5 sm:size-4 shrink-0" />
          </a>
        </div>

      </div>
    </div>
  );
}
