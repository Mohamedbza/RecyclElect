import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/shared";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { laptops, parts, featuredProducts } from "../data/mockData";
import { EmptyState } from "../components/shared";
import { toast } from "sonner";

export const FavoritesPage = () => {
  const { getFavoriteProducts, getFavoritesCount, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  // Combine all products from different categories
  const allProducts = [...laptops, ...parts, ...featuredProducts];
  const favoriteProducts = getFavoriteProducts(allProducts);

  const handleToggleFavorite = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    const isCurrentlyFavorite = isFavorite(productId);
    
    toggleFavorite(productId);
    
    if (isCurrentlyFavorite) {
      toast.error(`${product?.name} retiré des favoris`);
    } else {
      toast.success(`${product?.name} ajouté aux favoris !`);
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    toast.success(`${allProducts.find(p => p.id === productId)?.name} ajouté au panier !`);
  };

  const handleBuyNow = (productId: string) => {
    addToCart(productId);
    toast.success(`${allProducts.find(p => p.id === productId)?.name} ajouté au panier !`);
    // Could navigate to checkout here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-pink-600/20 via-rose-600/20 to-red-600/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-cyber opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="font-medium">Vos Produits Favoris</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Mes <span className="text-gradient">Favoris</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Retrouvez tous vos produits favoris en un seul endroit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/5 via-transparent to-rose-900/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(244,63,94,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/j-achete"
              className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour aux produits</span>
            </Link>
          </motion.div>

          {/* Favorites Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {getFavoritesCount()} produit{getFavoritesCount() > 1 ? 's' : ''} favori{getFavoritesCount() > 1 ? 's' : ''}
              </h2>
            </div>
          </motion.div>

          {/* Favorites Grid */}
          {favoriteProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <EmptyState
                icon={Heart}
                title="Aucun favori pour le moment"
                description="Ajoutez des produits à vos favoris pour les retrouver ici"
                actionLabel="Découvrir nos produits"
                onAction={() => window.location.href = '/j-achete'}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {favoriteProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onViewDetails={() => {}} // Could implement modal here
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}; 