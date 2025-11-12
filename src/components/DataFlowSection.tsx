import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Cpu, Cloud, Monitor, Bell } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const flowSteps = [
  {
    id: "sensors",
    icon: Activity,
    title: "Data Collection",
    subtitle: "Sensors Layer",
    description: "Sensors constantly collect environmental data — gas levels, temperature, humidity.",
    readings: ["CH₄: 20ppm", "CO: 5ppm", "Temp: 33°C"],
  },
  {
    id: "processing",
    icon: Cpu,
    title: "Processing",
    subtitle: "Microcontroller Layer",
    description: "Data is processed by the ESP32 microcontroller, preparing it for transmission.",
    readings: [],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Transmission",
    subtitle: "Firebase Layer",
    description: "The ESP32 sends real-time data to Firebase using WiFi, ensuring instant communication.",
    readings: [],
  },
  {
    id: "dashboard",
    icon: Monitor,
    title: "Web Dashboard",
    subtitle: "Supervisor Layer",
    description: "Supervisors can view live readings from all miners through the web dashboard.",
    readings: [],
  },
  {
    id: "alert",
    icon: Bell,
    title: "Alert System",
    subtitle: "Emergency Reaction",
    description: "When danger crosses limits, alerts are instantly triggered — saving time, saving lives.",
    readings: [],
  },
];

export const DataFlowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each step on scroll
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8,
          });

          // Data flow animation (glowing dots)
          const dataFlow = step.querySelector(".data-flow");
          if (dataFlow) {
            gsap.to(dataFlow, {
              scrollTrigger: {
                trigger: step,
                start: "top 60%",
              },
              opacity: 1,
              duration: 0.5,
            });

            gsap.to(dataFlow.children, {
              scrollTrigger: {
                trigger: step,
                start: "top 60%",
              },
              y: -20,
              opacity: 0,
              stagger: 0.2,
              duration: 1,
              repeat: -1,
              ease: "power1.out",
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-coal-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-12">
          Data Flow{" "}
          <span className="text-electric-blue" style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }}>
            Animation
          </span>
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-32">
          The heart of the system — from sensor to safety
        </p>

        <div className="max-w-5xl mx-auto space-y-32">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const isAlert = step.id === "alert";

            return (
              <div
                key={step.id}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative"
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-32 h-32 rounded-full ${
                        isAlert
                          ? "bg-gradient-to-br from-danger-red/20 to-neon-orange/20 border-danger-red"
                          : "bg-gradient-to-br from-electric-blue/20 to-glow-cyan/20 border-electric-blue"
                      } border-4 flex items-center justify-center relative`}
                    >
                      <Icon
                        className={`w-16 h-16 ${isAlert ? "text-danger-red" : "text-electric-blue"}`}
                      />
                      
                      {/* Flowing data dots */}
                      <div className="data-flow absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col gap-2 opacity-0">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              isAlert ? "bg-danger-red" : "bg-electric-blue"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{step.title}</h3>
                    <p className={`text-lg font-semibold mb-4 ${isAlert ? "text-danger-red" : "text-electric-blue"}`}>
                      {step.subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg mb-4">{step.description}</p>

                    {/* Readings */}
                    {step.readings.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {step.readings.map((reading, i) => (
                          <div
                            key={i}
                            className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg px-4 py-2 font-mono text-electric-blue"
                          >
                            {reading}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Alert box */}
                    {isAlert && (
                      <div className="mt-4 bg-danger-red/10 border border-danger-red rounded-lg p-4 animate-pulse">
                        <p className="text-danger-red font-bold">
                          ⚠️ ALERT! Worker ID: M-05 | CO Level Exceeded | Location: Tunnel 3
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector line */}
                {index < flowSteps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-16 w-0.5 h-16 bg-gradient-to-b from-electric-blue to-transparent md:hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
