import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const revealLines = [
  { text: "THIS ISN'T JUST A TOURNAMENT.", emphasis: true },
  { text: "It's where rivalries are born." },
  { text: "Where every round matters." },
  { text: "Where teamwork becomes your greatest weapon." },
  { text: "Where pressure creates champions." },
  { text: "And where your legacy begins." },
  { text: "Welcome to Nexus.", emphasis: true },
];

const About = () => {
  useGSAP(() => {
    // Prevent GSAP from recalculating/jumping the pinned scroll animation
    // when a mobile browser's address bar shows/hides mid-scroll.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Normalizes scroll input (trackpad/touch/wheel) into a consistent,
    // GSAP-driven scroll so pinned/scrubbed sections track the pointer
    // smoothly instead of feeling laggy or stepped.
    ScrollTrigger.normalizeScroll(true);

    gsap.set(".about-reveal-word", {
      opacity: 0,
      y: 20,
      scale: 0.9,
      rotateX: -15,
      filter: "blur(14px) brightness(0.6)",
    });
    gsap.set(".about-overlay-dim", { opacity: 0 });

    ScrollTrigger.matchMedia({
      // Desktop / tablet: unchanged growth phase, extended with the
      // line-by-line text reveal once the image finishes growing.
      "(min-width: 769px)": () => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=3200 center",
            scrub: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            pin: true,
            pinSpacing: true,
          },
        });

        clipAnimation
          .to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "none",
          })
          .to(".about-overlay-dim", { opacity: 1, ease: "none" }, ">")
          .to(
            ".about-reveal-word",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px) brightness(1)",
              stagger: 0.15,
              ease: "none",
            },
            "<",
          );
      },

      // Mobile: distance is derived from the actual viewport height instead
      // of a fixed desktop pixel value, and the pin start is anchored to the
      // top of the section (steadier than "center center" once the address
      // bar starts shrinking the viewport mid-scroll).
      "(max-width: 768px)": () => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 4.5)} top`,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            pin: true,
            pinSpacing: true,
          },
        });

        clipAnimation
          .to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "none",
          })
          .to(".about-overlay-dim", { opacity: 1, ease: "none" }, ">")
          .to(
            ".about-reveal-word",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px) brightness(1)",
              stagger: 0.15,
              ease: "none",
            },
            "<",
          );
      },
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-32 mt-32 flex flex-col items-center gap-5">
        <p className="font-general text-base uppercase tracking-wide md:text-lg">
          Welcome to NEXUS
        </p>

        <AnimatedTitle
          title="Wh<b>e</b>re Gamers <br /> Bec<b>o</b>me Champions"
          containerClass="mt-5 !text-black text-center"
        />
      </div>

      <div className="h-screen w-screen sm:h-dvh" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/finally-i-drew-wallpaper-for-every-agent-the-valorant-v0-f8p06c8d9ip51.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />

          <div className="about-overlay-dim absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center sm:gap-6">
            {revealLines.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={clsx(
                  "special-font whitespace-nowrap font-zentry text-lg font-black uppercase text-white sm:text-3xl md:text-4xl",
                  !line.emphasis && "text-blue-50",
                )}
              >
                {line.text.split(" ").map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="about-reveal-word inline-block"
                    style={{
                      marginRight: "0.3em",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      willChange: "filter, transform, opacity",
                      textShadow: "0 0 40px rgba(255,255,255,0.4)",
                    }}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-black py-14">
        <div className="animate-marquee-horizontal flex w-max items-center gap-32">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
            <p
              key={idx}
              className="special-font whitespace-nowrap font-zentry text-6xl font-black uppercase tracking-[0.2em] text-white sm:text-8xl"
            >
              Passion Meets Purpose
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
