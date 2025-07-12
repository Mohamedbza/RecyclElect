import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail } from "lucide-react";

export const NewsletterSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-green-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-display font-bold mb-4 text-black">
            Restez informé des <span className="text-gradient font-neon">nouveautés</span>
          </h3>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Recevez en avant-première nos meilleures offres et actualités tech
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-gray-500 placeholder-gray-500 focus:outline-none focus:border-primary-400 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary px-6 py-4 text-white font-semibold rounded-2xl"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}; 