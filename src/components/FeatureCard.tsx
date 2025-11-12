import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-xs">{description}</p>
    </motion.div>
  );
};
