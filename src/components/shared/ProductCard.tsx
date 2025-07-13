import { motion } from "framer-motion";
import {
  Heart,
  Check,
  ShoppingCart,
  CreditCard,
  Info,
  Calendar,
  Package
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  originalPrice?: number;
  images: string[];
  specifications: Array<{ id: string; name: string; value: string }>;
  warranty: string;
  condition: 'excellent' | 'bon' | 'moyen';
  stock: number;
  category: string;
  brand?: string;
  model?: string;
  createdAt: Date;
  imageUrl?: string;
  specs?: string;
  productType?: 'laptop' | 'part';
  avatar?: string;
  title?: string;
  quote?: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onBuyNow: (productId: string) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onViewDetails
}: ProductCardProps) => {
  const { theme } = useTheme();
  
  // Helper function to get condition color
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-500/80 text-white';
      case 'bon':
        return 'bg-yellow-500/80 text-white';
      case 'moyen':
        return 'bg-orange-500/80 text-white';
      default:
        return 'bg-gray-500/80 text-white';
    }
  };

  // Helper function to format price
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return `${price}$ CAD`;
  };

  // Helper function to calculate discount percentage
  const getDiscountPercentage = () => {
    if (!product.originalPrice || typeof product.price === 'string') return null;
    return Math.round((1 - Number(product.price) / product.originalPrice) * 100);
  };
  
  return (
  <motion.div
    layout
    className={`rounded-3xl overflow-hidden border transition-all duration-300 group backdrop-blur-xl h-auto flex flex-col cursor-pointer ${
      theme === 'light'
        ? 'bg-white shadow-lg border-gray-200 hover:border-primary-400/50'
        : 'glass-dark border-white/10 hover:border-primary-400/50 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50'
    }`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    onClick={() => onViewDetails(product)}
  >
    <div className="relative">
      <img
        src={product.images[0] || product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-102 transition-transform duration-200"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isFavorite
              ? 'bg-red-500/80 text-white'
              : 'bg-black/50 text-white/70 hover:text-red-400'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getConditionColor(product.condition)}`}>
          {product.condition === 'excellent' ? 'Excellent' : 
           product.condition === 'bon' ? 'Bon' : 'Moyen'}
        </span>
      </div>
      {product.originalPrice && (
        <div className="absolute bottom-4 left-4">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{getDiscountPercentage()}%
          </span>
        </div>
      )}
    </div>

    <div className="p-6 flex-1 flex flex-col">
      {/* Product Name and Brand */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-bold text-lg group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            {product.name}
          </h3>
          {product.brand && (
            <p className={`text-sm ${
              theme === 'light' ? 'text-black/70' : 'text-white/60'
            }`}>
              <span className="font-semibold">Marque:</span> {product.brand}
            </p>
          )}
          {product.model && (
            <p className={`text-sm ${
              theme === 'light' ? 'text-black/70' : 'text-white/60'
            }`}>
              <span className="font-semibold">Modèle:</span> {product.model}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          theme === 'light' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-blue-900/50 text-blue-300'
        }`}>
          <Package className="w-3 h-3 mr-1" />
          {product.category}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-3">
          <p className={`text-sm ${
            theme === 'light' ? 'text-black/70' : 'text-white/70'
          }`}>
            {product.description}
          </p>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="space-y-1 mb-4">
          <h4 className={`text-sm font-semibold mb-2 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <Info className="w-4 h-4 inline mr-1" />
            Spécifications
          </h4>
          {product.specifications.map((spec, index) => (
            <div key={index} className={`flex items-center text-xs ${
              theme === 'light' ? 'text-black/70' : 'text-white/70'
            }`}>
              <Check className="w-3 h-3 text-primary-400 mr-2 flex-shrink-0" />
              <span className="font-medium">{spec.name}:</span>
              <span className="ml-1 truncate">{spec.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Price Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary-400">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className={`text-sm line-through ${
              theme === 'light' ? 'text-black/50' : 'text-white/50'
            }`}>
              {product.originalPrice}$ CAD
            </p>
          )}
        </div>
        <div className="text-right">
          <p className={`text-sm ${
            theme === 'light' ? 'text-black/70' : 'text-white/60'
          }`}>
            Stock: {product.stock}
          </p>
          <p className={`text-xs ${
            theme === 'light' ? 'text-black/50' : 'text-white/50'
          }`}>
            Garantie {product.warranty}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-4 space-y-1">
        {product.createdAt && (
          <div className={`flex items-center text-xs ${
            theme === 'light' ? 'text-black/50' : 'text-white/50'
          }`}>
            <Calendar className="w-3 h-3 mr-1" />
            Ajouté le {product.createdAt.toLocaleDateString('fr-CA')}
          </div>
        )}
        {product.productType && (
          <div className={`flex items-center text-xs ${
            theme === 'light' ? 'text-black/50' : 'text-white/50'
          }`}>
            <Package className="w-3 h-3 mr-1" />
            Type: {product.productType === 'laptop' ? 'Ordinateur portable' : 'Pièce'}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          className="flex-1 btn-secondary text-gray-600 py-3 px-4 rounded-xl flex items-center justify-center font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Panier
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onBuyNow(product.id);
          }}
          className="flex-1 btn-primary text-white py-3 px-4 rounded-xl flex items-center justify-center font-semibold"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Acheter
        </motion.button>
      </div>
    </div>
  </motion.div>
  );
};