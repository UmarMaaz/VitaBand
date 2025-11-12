import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChartLine, FaLightbulb, FaUserTie } from "react-icons/fa"; // Placeholder icons
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
          Data Analytics & Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Data analytics helps identify patterns in mine environments — enabling preventive measures and smarter safety decisions.
        </motion.p>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <FaChartLine className="text-primary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Trend Analysis</h3>
            <p className="text-muted-foreground text-center">
              Visualize average gas levels over time to predict potential hazards.
            </p>
            {/* Placeholder for a glowing line graph */}
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm">Graph Placeholder</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <FaLightbulb className="text-secondary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Peak Variations</h3>
            <p className="text-muted-foreground text-center">
              Identify peak temperature and humidity variations during shifts for environmental control.
            </p>
            {/* Placeholder for a glowing bar chart */}
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm">Chart Placeholder</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center shadow-lg hover:shadow-primary-glow transition-all duration-300"
          >
            <FaUserTie className="text-tertiary text-6xl mb-4 drop-shadow-glow" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">Smarter Decisions</h3>
            <p className="text-muted-foreground text-center">
              Empower data analysts to make informed decisions for enhanced safety protocols.
            </p>
            {/* Placeholder for an animated character icon */}
            <div className="w-full h-32 bg-gray-800 rounded-lg mt-4 flex items-center justify-center text-gray-600">
              <span className="text-sm">Analyst Icon Placeholder</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};
