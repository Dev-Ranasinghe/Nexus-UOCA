import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["Nexus", "About", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // State for toggling the mobile liquid-glass menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-20 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="relative size-full">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Profile icon */}
            <div className="flex items-center gap-7">
              <img
                src="/img/Leo Logo.png"
                alt="profile"
                className="size-10 rounded-full object-cover"
              />
            </div>

            {/* Navigation Links and Audio Button */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/* Liquid-glass hamburger toggle (mobile only) */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="liquid-glass relative ml-5 flex size-10 items-center justify-center rounded-full md:hidden"
              >
                <div className="flex w-4 flex-col items-center gap-[5px]">
                  <span
                    className={clsx(
                      "h-[2px] w-full rounded-full bg-white transition-all duration-300",
                      isMenuOpen && "translate-y-[7px] rotate-45"
                    )}
                  />
                  <span
                    className={clsx(
                      "h-[2px] w-full rounded-full bg-white transition-all duration-300",
                      isMenuOpen && "opacity-0"
                    )}
                  />
                  <span
                    className={clsx(
                      "h-[2px] w-full rounded-full bg-white transition-all duration-300",
                      isMenuOpen && "-translate-y-[7px] -rotate-45"
                    )}
                  />
                </div>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Backdrop, click to close */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={clsx(
          "fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Liquid-glass mobile menu drawer */}
      <div
        className={clsx(
          "liquid-glass fixed inset-y-0 left-0 z-[60] w-1/3 min-w-[220px] rounded-none rounded-r-3xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="liquid-glass relative mb-10 flex size-9 items-center justify-center rounded-full"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white" />
            <span className="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
          </span>
        </button>

        <div className="flex flex-col gap-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="special-font font-zentry text-3xl font-black uppercase text-white transition-colors hover:text-yellow-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
