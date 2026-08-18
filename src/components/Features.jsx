import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { TiLocationArrow } from "react-icons/ti";
import NexusSectionModal from "./NexusSectionModal";

export const BentoTilt = ({ children, className = "", onClick }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={clsx(className, onClick && "cursor-pointer")}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  src,
  title,
  label,
  description,
  isComingSoon,
  buttonText = "EXPLORE",
  bgClassName,
  dark,
  fitContent,
  onClick,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { rootMargin: "100px", threshold: 0.15 },
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [src]);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div
      className={clsx(
        "relative w-full group",
        fitContent ? "h-48 sm:h-full sm:size-full" : "size-full",
        bgClassName,
      )}
    >
      {src && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute left-0 top-0 size-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}
      <div
        className={clsx(
          "relative z-10 flex w-full flex-col p-5",
          fitContent
            ? "gap-6 sm:size-full sm:justify-between sm:gap-0"
            : "size-full justify-between",
          dark ? "text-black" : "text-blue-50",
        )}
      >
        <div>
          {label && (
            <p
              className={clsx(
                "mb-2 text-sm uppercase tracking-wider font-semibold",
                dark ? "text-black/70" : "text-white/70",
              )}
            >
              {label}
            </p>
          )}
          <h1 className="bento-title special-font max-w-64">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base font-circular-web">{description}</p>
          )}
        </div>

        {(isComingSoon || buttonText) && (
          <div
            ref={hoverButtonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              "border-hsla relative flex w-fit cursor-pointer items-center gap-1.5 overflow-hidden rounded-full px-3 py-1 text-[10px] uppercase font-bold tracking-wider sm:px-5 sm:py-2 sm:text-xs transition-all duration-300 shadow-lg",
              dark
                ? "bg-black/10 text-black/80 hover:bg-black/20"
                : "bg-black/70 text-white hover:bg-black hover:scale-105",
            )}
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 text-[12px] sm:text-base" />
            <p className="relative z-20">
              {isComingSoon ? "coming soon" : buttonText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tournament");

  const openSectionModal = (tabId) => {
    setActiveTab(tabId);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-black pb-32" id="nexus">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 pb-32 pt-10">
          <p className="font-circular-web text-lg text-blue-50">
            Two Games. One Cause.
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Two games. One arena. Infinite competition. Join the ultimate
            Valorant and PUBG showdown, proudly presented by the Leo Club of
            UOCA.
          </p>
        </div>

        {/* Card 1: The Tournament */}
        <BentoTilt
          onClick={() => openSectionModal("tournament")}
          className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
        >
          <BentoCard
            src="videos/feature-1.mp4"
            title="The Tournament"
            description="Everything you need to know. Project Diyawara 100% Charity Fundraiser."
            buttonText="EXPLORE OVERVIEW"
            onClick={() => openSectionModal("tournament")}
          />
        </BentoTilt>

        <div className="grid h-[95vh] w-full grid-cols-2 grid-rows-[1fr_1fr_auto] gap-7 sm:h-[135vh] sm:grid-rows-3">
          
          {/* Card 2: Valorant */}
          <BentoTilt
            onClick={() => openSectionModal("valorant")}
            className="bento-tilt_2"
          >
            <BentoCard
              src="videos/feature-2.mp4"
              label="Featured PC Game"
              title="Valorant"
              description="5v5 Tactical • LKR 35,000 Pool"
              buttonText="VIEW RULES"
              onClick={() => openSectionModal("valorant")}
            />
          </BentoTilt>

          {/* Card 3: PUBG Mobile */}
          <BentoTilt
            onClick={() => openSectionModal("pubg")}
            className="bento-tilt_2"
          >
            <BentoCard
              src="videos/feature-3.mp4"
              label="Featured Mobile Game"
              title="PUBG Mobile"
              description="Duo BR • LKR 40,000 Pool"
              buttonText="VIEW RULES"
              onClick={() => openSectionModal("pubg")}
            />
          </BentoTilt>

          {/* Card 4: Tournament Format */}
          <BentoTilt
            onClick={() => openSectionModal("format")}
            className="bento-tilt_2"
          >
            <BentoCard
              src="videos/feature-4.mp4"
              title="Tournament Format"
              description="Knockout & Battle Royale Blueprint"
              buttonText="VIEW FORMAT"
              onClick={() => openSectionModal("format")}
            />
          </BentoTilt>

          {/* Card 5: Prize Pool */}
          <BentoTilt
            onClick={() => openSectionModal("prizepool")}
            className="bento-tilt_2"
          >
            <BentoCard
              src="videos/feature-5.mp4"
              title="Prize Pool"
              description="LKR 75,000 Championship Pool"
              buttonText="VIEW STAKES"
              onClick={() => openSectionModal("prizepool")}
            />
          </BentoTilt>

          {/* Card 6: Our Partners */}
          <BentoTilt className="bento-tilt_2">
            <BentoCard
              title="Our Partners"
              bgClassName="bg-violet-300"
              dark
              isComingSoon
              fitContent
            />
          </BentoTilt>

          {/* Card 7: Register Now */}
          <BentoTilt className="bento-tilt_2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSck-1Jp0XFg0dI_cJ2RCS_pKBD5AdeGLvqFIWQV3m-pxUDI6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <BentoCard
                title="Register Now"
                bgClassName="bg-violet-300"
                dark
                buttonText="SECURE YOUR SLOT"
                fitContent
              />
            </a>
          </BentoTilt>
        </div>
      </div>

      {/* Modal Popup Component */}
      <NexusSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

export default Features;
