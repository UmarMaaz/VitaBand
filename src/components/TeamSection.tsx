import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimatedSection } from "./AnimatedSection";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Placeholder icons for social media
import maazImage from "../assets/maaz.jpg"; // Import the image

interface TeamMemberProps {
  name: string;
  role: string;
  avatarSrc: string; // Placeholder for avatar image
  githubUrl?: string;
  linkedinUrl?: string;
  delay: number;
  imagePosition?: string; // Add this line
}

const TeamMemberCard = ({ name, role, avatarSrc, githubUrl, linkedinUrl, delay, imagePosition }: TeamMemberProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      whileHover={{ rotateY: 10, boxShadow: "0 0 40px hsl(240 100% 70% / 0.4)" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl p-8 flex flex-col items-center relative overflow-hidden group"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <img
          src={avatarSrc}
          alt={name}
          className={`w-48 h-48 rounded-full object-cover mb-4 border-2 border-primary shadow-lg ${imagePosition}`}
        />
        <h3 className="text-2xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-primary text-sm mb-4">{role}</p>
        <div className="flex space-x-4">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <FaGithub className="text-2xl" />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const TeamSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <AnimatedSection className="py-20 px-4 md:px-8 bg-gradient-to-b from-coal-black to-gray-900 text-foreground relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold mb-6 text-white drop-shadow-glow"
        >
          Meet the Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          The innovators behind VITABAND, dedicated to empowering safety and preserving lives.
        </motion.p>

        <div ref={ref} className="grid md:grid-cols-2 gap-16 relative justify-center">
          {/* Network lines - conceptual, can be implemented with SVG/CSS later */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="w-3/4 h-3/4 border border-dashed border-blue-500/30 rounded-full animate-pulse-slow"
            />
          </div>

          <TeamMemberCard
            name="Umar Maaz"
            role="System Developer & IoT Integration Lead"
            avatarSrc={maazImage} // Use the imported image
            githubUrl="https://github.com/umarmaaz" // Example URL
            linkedinUrl="https://linkedin.com/in/umarmaaz" // Example URL
            delay={0.6}
            imagePosition="object-top" // Add object-position: top
          />
          <TeamMemberCard
            name="Hina Khan"
            role="UI/UX Designer, Documentation Support" // Updated role
            avatarSrc="https://via.placeholder.com/150/FFAA00/FFFFFF?text=HK" // Placeholder image
            delay={0.8}
          />
        </div>
      </div>
    </AnimatedSection>
  );
};
