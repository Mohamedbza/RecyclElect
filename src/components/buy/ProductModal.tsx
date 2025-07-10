import React, { useState } from "react";
import {
  X,
  Heart,
  Check,
  Zap,
  ShieldCheck,
  Truck,
  Award,
  ShoppingCart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Modal, StarRating, Button } from "../shared";
import type { Product } from "../shared/ProductCard";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  conditions: Array<{ id: string; name: string; color: string }>;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  conditions
}: ProductModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when product changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      showHeader={false}
      className="p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-white/60">{product.brand}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative">
          {/* Main Image */}
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full rounded-2xl"
            />
            
            {/* Navigation Buttons */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-primary-400 scale-105'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Counter */}
          {product.images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-primary-400">{product.price}$ CAD</p>
                {product.originalPrice && (
                  <p className="text-lg text-white/50 line-through">{product.originalPrice}$ CAD</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-white/70 hover:text-red-400'
                  }`}
                >
                  <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <StarRating 
              rating={product.rating} 
              reviews={product.reviews} 
              size="lg" 
              className="mb-4" 
            />

            <p className="text-white/70 mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold">Spécifications</h4>
              {product.specs.map((spec, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-primary-400 mr-3" />
                  <span className="text-white/80">{spec}</span>
                </div>
              ))}
            </div>

            {product.features && (
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold">Caractéristiques</h4>
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Zap className="w-4 h-4 text-secondary-400 mr-3" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm">Garantie {product.warranty}</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-sm">Livraison gratuite</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <span className={`text-sm ${conditions.find(c => c.id === product.condition)?.color}`}>
                  {conditions.find(c => c.id === product.condition)?.name}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => onAddToCart(product.id)}
                variant="primary"
                size="lg"
                icon={ShoppingCart}
                className="flex-1"
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};