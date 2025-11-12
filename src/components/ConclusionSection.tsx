import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import minerSilhouette from "@/assets/miner-silhouette.png";

gsap.registerPlugin(ScrollTrigger);

export const ConclusionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const minerRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background brightening
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        },
        backgroundColor: "hsl(0 0% 20%)",
      });

      // Miner walking out animation
      gsap.from(minerRef.current, {
        scrollTrigger: {
          trigger: minerRef.current,
          start: "top 70%",
        },
        x: -200,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });

      // Text reveal
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
          },
          opacity: 0,
          y: 30,
          stagger: 0.3,
          duration: 1,
        });
      }

      // Logo final animation
      gsap.from(logoRef.current, {
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 70%",
        },
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Torch glow
      gsap.to(logoRef.current?.querySelector(".torch"), {
        textShadow: "0 0 40px hsl(187 100% 50%), 0 0 80px hsl(187 100% 50%)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 bg-coal-black overflow-hidden transition-colors duration-1000"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Miner walking out */}
        <div className="flex justify-center mb-20">
          <img
            ref={minerRef}
            src={minerSilhouette}
            alt="Miner walking safely"
            className="w-64 h-64 object-contain"
            style={{ filter: "drop-shadow(0 0 30px hsl(187 100% 50%))" }}
          />
        </div>

        {/* Text content */}
        <div ref={textRef} className="max-w-4xl mx-auto text-center space-y-8 mb-20">
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            VITABAND isn't just a device —{" "}
            <span className="text-electric-blue">it's a lifeline</span>.
          </h2>

          <p className="text-2xl text-foreground leading-relaxed">
            Through smart IoT systems and real-time cloud intelligence,
            we make the invisible dangers visible.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent mx-auto my-12" />

          <p className="text-3xl font-bold text-electric-blue">
            Because every life underground deserves a light above.
          </p>
        </div>

        {/* Final logo */}
        <div ref={logoRef} className="text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-4">
            V
            <span
              className="torch inline-block text-electric-blue"
              style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }}
            >
              I
            </span>
            TABAND
          </h1>
          <p className="text-xl text-muted-foreground">
            Smarter. Safer. Stronger.
          </p>
        </div>

        {/* Thank you footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for experiencing our vision
          </p>
        </div>
      </div>
    </section>
  );
};
