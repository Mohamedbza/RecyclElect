import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { ServicesSection } from "../components/ServicesSection";
import { VideoSection } from "../components/VideoSection";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CategoriesSection } from "../components/CategoriesSection";
import { CallToActionSection } from "../components/CallToActionSection";
import { NewsletterSection } from "../components/NewsletterSection";
import { useTheme } from "../contexts/ThemeContext";

export const HomePage = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-neutral-900 text-white'
    }`}>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <VideoSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <CategoriesSection />
      <CallToActionSection />
      <NewsletterSection />
    </div>
  );
}; 