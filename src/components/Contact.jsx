import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, imgClassName = "" }) => (
  <div className={clipClass}>
    <img src={src} className={imgClassName} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative overflow-hidden rounded-lg bg-black py-32 text-blue-50">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/825335.jpg"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/finally-i-drew-wallpaper-for-every-agent-the-valorant-v0-f7v100kn8ip51.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 hidden w-60 sm:block sm:top-1/2 sm:-translate-y-1/2 md:left-auto md:right-10 lg:w-80">
          <ImageClipBox
            src="/img/Omen-Valorant-Defiance.jpg"
            clipClass="absolute md:scale-125"
            imgClassName="aspect-[1286/1582] w-full object-cover"
          />
          <ImageClipBox
            src="/img/Omen-Valorant-Defiance.jpg"
            clipClass="sword-man-clip-path md:scale-125"
            imgClassName="aspect-[1286/1582] w-full object-cover"
          />
        </div>


        <div className="flex flex-col items-center px-6 text-center md:px-24 lg:px-40">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Nexus
          </p>

          <AnimatedTitle
            title="let&#39;s f<b>u</b>el the <br /> new era of <br /> g<b>a</b>ming leg<b>e</b>nds."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
