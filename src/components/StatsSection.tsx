import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Laptop,
  Award,
  Clock,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatData {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
  color: string;
  accentColor: string;
  bgPattern: string;
}

// Counter animation hook
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return { count, ref };
};

export const StatsSection = () => {
  const statsData = [
    { 
      value: 2500, 
      suffix: "+", 
      label: "Équipements reconditionnés", 
      sublabel: "Cette année",
      icon: Laptop, 
      color: "from-blue-500 via-blue-400 to-blue-600",
      accentColor: "blue-500",
      bgPattern: "bg-blue-50"
    },
    { 
      value: 98, 
      suffix: "%", 
      label: "Satisfaction client", 
      sublabel: "Note moyenne",
      icon: Award, 
      color: "from-green-500 via-green-400 to-green-600",
      accentColor: "green-500",
      bgPattern: "bg-green-50"
    },
    { 
      value: 24, 
      suffix: "h", 
      label: "Temps de réponse", 
      sublabel: "Support client",
      icon: Clock, 
      color: "from-orange-500 via-orange-400 to-orange-600",
      accentColor: "orange-500",
      bgPattern: "bg-orange-50"
    },
    { 
      value: 5, 
      suffix: " ans", 
      label: "D'expérience", 
      sublabel: "Sur le marché",
      icon: TrendingUp, 
      color: "from-purple-500 via-purple-400 to-purple-600",
      accentColor: "purple-500",
      bgPattern: "bg-purple-50"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1
    }
  };

  const StatCard = ({ stat, index }: { stat: StatData; index: number }) => {
    const { count, ref } = useCountAnimation(stat.value, 2500 + index * 200);
    
    return (
      <motion.div
        ref={ref}
        variants={itemVariants}
        whileHover={{ 
          y: -4, 
          scale: 1.01,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group relative"
      >
        {/* Background decorative elements */}
        <div className={`absolute -inset-0.5 ${stat.bgPattern} rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl" />
        
        {/* Main card */}
        <div className="relative bg-white backdrop-blur-xl p-6 rounded-3xl border border-gray-200 group-hover:border-gray-300 shadow-lg group-hover:shadow-xl transition-all duration-500 overflow-hidden h-80 flex flex-col">
          
          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Icon container with enhanced styling */}
          <div className="flex justify-center mb-4">
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105`}>
              <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
              <stat.icon className="w-8 h-8 text-white relative z-10 group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Stats content */}
          <div className="flex-1 flex flex-col justify-center text-center space-y-4">
            {/* Main number with counter animation */}
            <div className="space-y-2">
              <p className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                {count}{stat.suffix}
              </p>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${stat.color} mx-auto opacity-80 group-hover:opacity-100 group-hover:w-16 transition-all duration-500`} />
            </div>
            
            {/* Labels with better typography */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                {stat.label}
              </p>
              <p className={`text-sm font-medium text-${stat.accentColor}/70 group-hover:text-${stat.accentColor} transition-colors duration-300`}>
                {stat.sublabel}
              </p>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className={`w-2 h-2 bg-${stat.accentColor} rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300`} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Enhanced background with patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-2xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100 rounded-full blur-2xl opacity-60" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full blur-2xl opacity-60" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-6 py-3 border border-gray-200">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Nos performances</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">
            <span className="text-gray-900">Des chiffres qui</span>
            <br />
            <span className="text-gradient font-neon">parlent d'eux-mêmes</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre engagement envers l'excellence se reflète dans chaque métrique. 
            Découvrez pourquoi des milliers de clients nous font confiance.
          </p>
        </motion.div>

        {/* Stats grid with enhanced layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Bottom decorative section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center space-x-8 text-gray-700">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">10,000+ clients satisfaits</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Certifié ISO 9001</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 