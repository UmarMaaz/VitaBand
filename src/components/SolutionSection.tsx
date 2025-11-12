import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Bell, Thermometer, Wind } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Wind, label: "Toxic Gas Detection", sub: "MQ Sensors" },
  { icon: Thermometer, label: "Temperature Monitoring", sub: "Real-time" },
  { icon: Activity, label: "Humidity Tracking", sub: "Environmental" },
  { icon: Bell, label: "Emergency Alerts", sub: "Instant" },
];

export const SolutionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light beam sweep animation
      gsap.from(beamRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Band reveal
      gsap.from(bandRef.current, {
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top 70%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Features stagger
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
          },
          opacity: 0,
          scale: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Continuous glow pulse
      gsap.to(bandRef.current, {
        boxShadow: "0 0 40px hsl(187 100% 50%), 0 0 80px hsl(187 100% 50% / 0.5)",
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
      className="relative min-h-screen py-32 bg-gradient-to-b from-coal-black to-mine-gray overflow-hidden"
    >
      {/* Light beam */}
      <div
        ref={beamRef}
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-electric-blue via-glow-cyan to-electric-blue"
        style={{ filter: "blur(10px)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-12">
          Introducing{" "}
          <span className="text-electric-blue" style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }}>
            VITABAND
          </span>
        </h2>

        <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto">
          The solution emerges from the darkness — a beam of light in the most dangerous places
        </p>

        {/* 3D Band visualization */}
        <div className="flex justify-center mb-20">
          <div
            ref={bandRef}
            className="relative w-64 h-64 bg-gradient-to-br from-electric-blue/20 to-neon-orange/20 rounded-full border-4 border-electric-blue flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-electric-blue/10 to-transparent animate-spin-slow" />
            <div className="text-6xl">🎧</div>
          </div>
        </div>

        {/* Features grid */}
        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-electric-blue/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/60 backdrop-blur-sm border border-electric-blue/30 rounded-2xl p-6 text-center hover:border-electric-blue/60 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 bg-electric-blue/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{feature.label}</h3>
                  <p className="text-sm text-electric-blue">{feature.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xl text-foreground mt-16 max-w-3xl mx-auto">
          VITABAND constantly monitors the surrounding air quality and miner's environment,{" "}
          <span className="text-electric-blue font-semibold">sending instant alerts</span> when danger levels are detected.
        </p>
      </div>
    </section>
  );
};
