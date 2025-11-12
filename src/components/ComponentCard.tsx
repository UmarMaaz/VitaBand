import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ComponentCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const ComponentCard = ({ icon, title, description, delay = 0 }: ComponentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(24 100% 50% / 0.4)" }}
      className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-16 h-16 mb-4 text-primary flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
