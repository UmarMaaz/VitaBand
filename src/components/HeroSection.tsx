import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vitaImage from "../assets/vita.png"; // Import the vita.png image

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
        {/* Main Logo Image */}
        <img
          src={vitaImage}
          alt="VITABAND Logo"
          className="mx-auto mb-8 w-64 md:w-96 drop-shadow-glow" // Adjust size as needed
          style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }} // Apply glow effect
        />

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
      </div>
    </section>
  );
};
