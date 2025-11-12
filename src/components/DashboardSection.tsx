import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const DashboardSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [gasLevel, setGasLevel] = useState(40);
  const [coLevel, setCoLevel] = useState(10);
  const [temp, setTemp] = useState(36);
  const [humidity, setHumidity] = useState(78);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dashboard reveal
      gsap.from(dashboardRef.current, {
        scrollTrigger: {
          trigger: dashboardRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    // Simulate live data updates
    const interval = setInterval(() => {
      setGasLevel((prev) => Math.min(100, prev + Math.random() * 10 - 5));
      setCoLevel((prev) => Math.min(50, Math.max(0, prev + Math.random() * 4 - 2)));
      setTemp((prev) => Math.min(45, Math.max(30, prev + Math.random() * 2 - 1)));
      setHumidity((prev) => Math.min(100, Math.max(50, prev + Math.random() * 4 - 2)));
    }, 2000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const isDanger = gasLevel > 70 || coLevel > 30;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-mine-gray to-coal-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-12">
          Live{" "}
          <span className="text-electric-blue" style={{ filter: "drop-shadow(0 0 20px hsl(187 100% 50%))" }}>
            Dashboard
          </span>
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-20">
          Real-time monitoring and instant alerts
        </p>

        {/* Dashboard mockup */}
        <div
          ref={dashboardRef}
          className="max-w-6xl mx-auto bg-card/80 backdrop-blur-sm border border-electric-blue/30 rounded-3xl p-8 md:p-12"
        >
          {/* Alert banner */}
          {isDanger && (
            <div className="mb-8 bg-danger-red/20 border-2 border-danger-red rounded-xl p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-danger-red" />
                <p className="text-danger-red font-bold text-lg">
                  WARNING: Unsafe levels detected!
                </p>
              </div>
            </div>
          )}

          {/* Metrics grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard
              label="Gas (CH₄)"
              value={`${gasLevel.toFixed(0)}ppm`}
              isDanger={gasLevel > 70}
            />
            <MetricCard
              label="CO Level"
              value={`${coLevel.toFixed(0)}ppm`}
              isDanger={coLevel > 30}
            />
            <MetricCard
              label="Temperature"
              value={`${temp.toFixed(1)}°C`}
              isDanger={temp > 40}
            />
            <MetricCard
              label="Humidity"
              value={`${humidity.toFixed(0)}%`}
              isDanger={false}
            />
          </div>

          {/* Chart visualization */}
          <div className="bg-background/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-electric-blue" />
              <h3 className="font-semibold text-lg">Live Sensor Data Stream</h3>
            </div>
            <div className="h-32 flex items-end gap-1">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${
                    Math.random() > 0.7 ? "bg-danger-red" : "bg-electric-blue"
                  } transition-all`}
                  style={{
                    height: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.7,
                  }}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Every miner's environment is monitored in real-time, with instant cloud updates and visual alerts.
          </p>
        </div>
      </div>
    </section>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  isDanger: boolean;
}

const MetricCard = ({ label, value, isDanger }: MetricCardProps) => (
  <div
    className={`relative bg-background/60 rounded-xl p-6 border-2 transition-all ${
      isDanger
        ? "border-danger-red shadow-[0_0_20px_hsl(0_84%_60%/0.3)]"
        : "border-electric-blue/20"
    }`}
  >
    {isDanger && (
      <div className="absolute top-2 right-2">
        <div className="w-3 h-3 bg-danger-red rounded-full animate-pulse" />
      </div>
    )}
    <p className="text-sm text-muted-foreground mb-2">{label}</p>
    <p className={`text-3xl font-bold ${isDanger ? "text-danger-red" : "text-electric-blue"}`}>
      {value}
    </p>
  </div>
);
