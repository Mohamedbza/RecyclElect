import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {   Star, Shield, Clock } from "lucide-react";
import { featuredProducts } from "../data/mockData";

export const FeaturedProductsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'Excellent';
      case 'bon': return 'Bon';
      case 'moyen': return 'Moyen';
      default: return condition;
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Nos <span className="text-gradient font-neon">pépites du moment</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-black/70 max-w-3xl mx-auto">
            Découvrez les produits plébiscités par notre communauté d'experts et de passionnés.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="glass-dark rounded-3xl overflow-hidden group border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-[520px] min-h-[520px] hover:shadow-2xl hover:shadow-primary-400/20"
            >
              <div className="relative h-56 w-full flex-shrink-0">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                  {product.category}
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{getConditionText(product.condition)}</span>
                </div>
              </div>
              
              <div className="flex flex-col flex-1 justify-between p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-black line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-black/70 mt-2 text-sm line-clamp-2 leading-relaxed">{product.specs}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {product.specifications && product.specifications.slice(0, 2).map((spec) => (
                      <div key={spec.id} className="flex justify-between text-xs">
                        <span className="text-black/60">{spec.name}:</span>
                        <span className="text-black/80 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-black/70">
                      <Shield className="w-3 h-3" />
                      <span>{product.warranty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/70">
                      <Clock className="w-3 h-3" />
                      <span>Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-2xl font-bold text-primary-400">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-black/50 line-through">
                        {product.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link to="/j-achete" className="btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-2xl">
            Voir tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
}; 