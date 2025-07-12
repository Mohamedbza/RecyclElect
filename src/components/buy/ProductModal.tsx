import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Modal } from "../shared";
import type { Product } from "../shared/ProductCard";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose
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
      className="p-4 bg-neutral-900 mt-8 2xl:mt-16 2xl:max-w-3xl"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:bg-black/50 rounded-full text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative">
          <img
            src={product.images[currentImageIndex] || product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-[70vh] 2xl:max-h-[60vh] object-contain rounded-lg"
          />
          
          {/* Navigation Buttons */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {product.images.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
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
      </div>
    </Modal>
  );
};