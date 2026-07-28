import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Prevent GSAP from recalculating/jumping the pinned scroll animation
    // when a mobile browser's address bar shows/hides mid-scroll.
    ScrollTrigger.config({ ignoreMobileResize: true });

    ScrollTrigger.matchMedia({
      // Desktop / tablet: unchanged, this is the config that already works.
      "(min-width: 769px)": () => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=1600 center",
            scrub: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            pin: true,
            pinSpacing: true,
          },
        });

        clipAnimation.to(".mask-clip-path", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "none",
        });
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
            end: () => `+=${Math.round(window.innerHeight * 1.5)} top`,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            pin: true,
            pinSpacing: true,
          },
        });

        clipAnimation.to(".mask-clip-path", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "none",
        });
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
            src="img/wp2208669-pubg-wallpapers.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
