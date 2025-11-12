import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedSection } from "./AnimatedSection";
import { useEffect, useState } from "react";

interface MetricProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const AnimatedNumber = ({ value, suffix, label, delay }: MetricProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const animationDuration = 1500; // milliseconds
      const frameRate = 1000 / 60; // 60 frames per second
      const totalFrames = animationDuration / frameRate;
      const increment = value / totalFrames;

      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, frameRate);

      return () => clearInterval(timer);
    }
  }, [value, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <div className="text-5xl font-bold text-primary drop-shadow-glow">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground text-sm mt-2">{label}</p>
    </motion.div>
  );
};

export const ImpactVisualizationSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const infographicVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <AnimatedSection className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-coal-black text-foreground relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold mb-6 text-white drop-shadow-glow"
        >
          Impact Visualization
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          See the tangible difference VITABAND makes in real-world mining operations.
        </motion.p>

        <div ref={ref} className="relative flex flex-col items-center mb-20">
          {/* Timeline */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="w-full max-w-4xl flex justify-between items-center relative mb-10"
          >
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 top-1/2 -translate-y-1/2 rounded-full" />

            <div className="relative z-10 p-4 bg-red-600 rounded-full shadow-lg">
              <p className="text-white font-bold">Before</p>
              <p className="text-sm text-white/80">High Accident Rates</p>
            </div>

            <div className="relative z-10 p-4 bg-green-500 rounded-full shadow-lg">
              <p className="text-white font-bold">After</p>
              <p className="text-sm text-white/80">Safer Operations</p>
            </div>
          </motion.div>

          {/* Infographics */}
          <div className="grid md:grid-cols-3 gap-12 mt-10">
            <AnimatedNumber value={30} suffix="%" label="Faster Emergency Response" delay={0.6} />
            <AnimatedNumber value={90} suffix="%" label="Accurate Gas Detection" delay={0.8} />
            <AnimatedNumber value={100} suffix="+" label="Miners Monitored Simultaneously" delay={1.0} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
