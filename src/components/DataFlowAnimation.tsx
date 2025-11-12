import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const flowSteps = [
  { label: "Sensor Band", icon: "🎧" },
  { label: "LoRa Transmitter", icon: "📡" },
  { label: "Receiver", icon: "📻" },
  { label: "Cloud Database", icon: "☁️" },
  { label: "Mobile Dashboard", icon: "📱" },
];

export const DataFlowAnimation = () => {
  return (
    <div className="relative py-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
        {flowSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-card border-2 border-primary flex items-center justify-center text-4xl mb-3 relative">
                <div className="absolute inset-0 rounded-full animate-glow-pulse" />
                {step.icon}
              </div>
              <p className="text-sm font-semibold text-foreground">{step.label}</p>
            </motion.div>
            
            {index < flowSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                viewport={{ once: true }}
                className="hidden md:block"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-left hidden md:block"
      />
    </div>
  );
};
