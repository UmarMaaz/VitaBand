import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LineChart, BarChart, BrainCircuit } from "lucide-react"; // Better icons
import { AnimatedSection } from "./AnimatedSection";

export const DataAnalyticsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AnimatedSection className="py-20 px-4 md:px-8 bg-gradient-to-b from-coal-black to-gray-900 text-foreground relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold mb-6 text-white drop-shadow-glow"
        >
          Data-Driven Safety Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Leverage historical and real-time data to identify patterns, predict risks, and implement proactive safety measures.
        </motion.p>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <LineChart className="text-primary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Predictive Trend Analysis</h3>
            <p className="text-muted-foreground text-center">
              Analyze long-term data streams to forecast high-risk periods and locations, allowing for preemptive resource allocation.
            </p>
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm italic">e.g., "Gas levels historically peak in Sector 3 on Mondays"</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <BarChart className="text-secondary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Environmental Correlations</h3>
            <p className="text-muted-foreground text-center">
              Correlate temperature, humidity, and gas readings to understand complex environmental interactions and their impact on safety.
            </p>
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm italic">e.g., "High humidity correlates with a 15% increase in methane detection"</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <BrainCircuit className="text-tertiary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">AI-Powered Recommendations</h3>
            <p className="text-muted-foreground text-center">
              Our system uses machine learning to suggest safety protocol enhancements based on collected data patterns.
            </p>
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm italic">e.g., "Recommend mandatory ventilation checks in Tunnel 5"</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};
