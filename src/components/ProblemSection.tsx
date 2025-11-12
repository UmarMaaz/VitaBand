import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Flame, Wind, Radio } from "lucide-react";
import mineTunnel from "@/assets/mine-tunnel.jpg";

gsap.registerPlugin(ScrollTrigger);

const dangers = [
  {
    icon: Wind,
    label: "Toxic Gases",
    description: "Methane and carbon monoxide build up undetected",
  },
  {
    icon: Flame,
    label: "Extreme Heat",
    description: "Underground temperatures reach dangerous levels",
  },
  {
    icon: AlertTriangle,
    label: "Oxygen Depletion",
    description: "Lack of oxygen causes serious health risks",
  },
  {
    icon: Radio,
    label: "No Communication",
    description: "Signals cannot reach underground miners",
  },
];

export const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
      });

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
          opacity: 0,
          y: 80,
          stagger: 0.2,
        });
      }

      // Text blocks animation
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
          },
          opacity: 0,
          x: -50,
          stagger: 0.3,
          duration: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${mineTunnel})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-coal-black via-transparent to-coal-black" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-black text-center mb-20"
        >
          The Hidden{" "}
          <span className="text-danger-red" style={{ filter: "drop-shadow(0 0 20px hsl(0 84% 60%))" }}>
            Dangers
          </span>{" "}
          Underground
        </h2>

        {/* Danger Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {dangers.map((danger, index) => {
            const Icon = danger.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-danger-red/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-danger-red/30 rounded-2xl p-6 hover:border-danger-red/60 transition-all">
                  <Icon className="w-12 h-12 text-danger-red mb-4" />
                  <h3 className="text-xl font-bold mb-2">{danger.label}</h3>
                  <p className="text-sm text-muted-foreground">{danger.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Problem description */}
        <div ref={textRef} className="max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-xl text-foreground leading-relaxed">
            Underground mining is one of the most{" "}
            <span className="text-danger-red font-bold">dangerous professions</span> in the world.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Toxic gases, extreme heat, and lack of real-time alerts cause serious accidents every year.
          </p>
          <p className="text-2xl text-foreground font-semibold">
            Accidents happen not because of the danger — but because of{" "}
            <span className="text-danger-red">delayed awareness</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
