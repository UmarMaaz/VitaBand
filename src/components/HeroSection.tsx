import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo entrance animation
      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: "power3.out"
      });

      // Torch glow animation
      gsap.to(torchRef.current, {
        textShadow: "0 0 30px hsl(187 100% 50%), 0 0 60px hsl(187 100% 50%)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Tagline fade in
      gsap.from(taglineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: "power2.out"
      });

      // Scroll-out animation
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.8,
      });

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-50, 50)`,
            opacity: 0.3,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-coal-black"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coal-black via-mine-gray to-electric-blue/10" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div ref={logoRef} className="relative z-10 text-center px-4">
        {/* Main Logo */}
        <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tight">
          V
          <span
            ref={torchRef}
            className="inline-block text-electric-blue"
            style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }}
          >
            I
          </span>
          TABAND
        </h1>

        {/* Underline */}
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent mx-auto mb-12" />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-2xl md:text-3xl font-light text-foreground/90 mb-4"
        >
          Empowering Safety. Preserving Lives.
        </p>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A smart safety band designed for miners — where every second counts.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-electric-blue rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-electric-blue rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
