import gsap from "gsap";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import Loader from "./Loader";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Guarantees the loader is visible for one full animation cycle on every
  // refresh, instead of flashing by instantly when videos load from cache.
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1 && minTimeElapsed) {
      setLoading(false);
    }
  }, [loadedVideos, minTimeElapsed]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  const goToVideo = (index) => {
    const nextIndex = (((index - 1) % totalVideos) + totalVideos) % totalVideos + 1;

    if (nextIndex === currentIndex) return;

    setHasClicked(true);
    setCurrentIndex(nextIndex);
  };

  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaX) < 40) return;

    goToVideo(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const heroVideos = [
    "videos/giphy360p.mp4",
    "videos/giphy360p (1).mp4",
    "videos/giphy360p (2).mp4",
    "videos/giphy480p.mp4",
  ];
  const getVideoSrc = (index) => encodeURI(heroVideos[index - 1]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black">
          <div className="relative size-64">
            <Loader />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 hidden size-64 cursor-pointer overflow-hidden rounded-lg md:block">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <div className="absolute inset-x-0 bottom-24 z-50 flex justify-center gap-3 md:hidden">
          {heroVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToVideo(idx + 1)}
              aria-label={`Show video ${idx + 1}`}
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === idx + 1 ? "w-6 bg-yellow-300" : "w-2 bg-white/40"
              )}
            />
          ))}
        </div>

        <h1 className="special-font hero-heading pointer-events-none absolute bottom-5 right-5 z-40 text-right !text-4xl sm:!text-6xl md:!text-7xl lg:!text-7xl leading-[0.85] text-blue-75">
          esp<b>o</b>rts <br /> tourna<b>m</b>ent
        </h1>

        <div className="pointer-events-none absolute left-0 top-0 z-40 size-full">
          <div className="pointer-events-auto mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              ne<b>x</b>us
            </h1>

            <p className="my-4 whitespace-nowrap font-general text-sm uppercase tracking-wide text-blue-100">
              A project by LEO Club UOC Alumni
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSck-1Jp0XFg0dI_cJ2RCS_pKBD5AdeGLvqFIWQV3m-pxUDI6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block"
            >
              <Button
                id="watch-trailer"
                title="Register"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1 !px-8 !py-4 ring-2 ring-yellow-100/50 cta-standout"
              />
            </a>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-right !text-4xl sm:!text-6xl md:!text-7xl lg:!text-7xl leading-[0.85] text-black">
        esp<b>o</b>rts <br /> tourna<b>m</b>ent
      </h1>
    </div>
  );
};

export default Hero;
