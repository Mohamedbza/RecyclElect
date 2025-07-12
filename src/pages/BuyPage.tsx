import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Battery,
  ShoppingCart,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Minus,
  X,
  Check,
  Shield,
  CreditCard,
  Trash2,
  Heart
} from "lucide-react";
import { ProductCard } from "../components/shared";
import { ProductModal } from "../components/buy";
import { CheckoutModal } from "../components/checkout";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { toast } from "sonner";

import type { Product } from "../components/shared/ProductCard";

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tecra Harman - tactile',
    description: "30 jours de garantie 2 heures d'autonomie garantie, mais vont généralement au delà. ",
    price: 300,
    originalPrice: 499,
    images: [
      '/products/Tecra Harman - tactile/1.jpg',
      '/products/Tecra Harman - tactile/2.jpg',
      '/products/Tecra Harman - tactile/3.jpg',
      '/products/Tecra Harman - tactile/4.jpg',
      '/products/Tecra Harman - tactile/5.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Type', value: 'Tactile' },
      { id: 'spec2', name: 'Processeur', value: 'Core i5 8 eme gen' },
      { id: 'spec3', name: 'RAM', value: '16GB RAM' },
      { id: 'spec4', name: 'Stockage', value: '256GB SSD' }
    ],
    warranty: '1 mois',
    condition: 'excellent',
    stock: 3,
    category: 'laptop',
    brand: 'Toshiba',
    model: 'MacBook Pro',
    productType: 'laptop',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Dell 7 ieme generation',
    description: 'Dell professionnel léger et performant, idéal pour les déplacements.',
    price: 160,
    originalPrice: 290,
    images: [
      '/products/dell 7ieme/1.jpg',
      '/products/dell 7ieme/2.jpg',
      '/products/dell 7ieme/3.jpg',
      '/products/dell 7ieme/4.jpg',
      '/products/dell 7ieme/5.jpg',
      '/products/dell 7ieme/6.jpg',
      '/products/dell 7ieme/7.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel Core i3-7th' },
      { id: 'spec2', name: 'RAM', value: '8GB RAM' },
      { id: 'spec3', name: 'Stockage', value: '256GB SSD' }
    ],
    warranty: '1 mois',
    condition: 'bon',
    stock: 5,
    category: 'laptop',
    brand: 'Dell',
    model: '-',
    productType: 'laptop',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'ChromeBook HP 11 G5',
    description: 'Chromebook HP 11 G5 avec écran 11.6 pouces, idéal pour les étudiants et la navigation web.',
    price: 70,
    originalPrice: 100,
    images: [
      '/products/chromebook HP 11 g5/1.jpg',
      '/products/chromebook HP 11 g5/2.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel Atom' },
      { id: 'spec2', name: 'RAM', value: '4GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '16GB ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces' }
    ],
    warranty: '1 mois',
    condition: 'moyen',
    stock: 8,
    category: 'laptop',
    brand: 'HP',
    model: 'Chromebook 11 G5',
    productType: 'laptop',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: 'Chromebook Tactile Dell Latitude 3189',
    description: "DELL Latitude 3189 Intel Pentium N4200 (1,1 GHz) Mémoire 8 Go SSD 32 Go Intel HD Graphics 505 Écran tactile 11,6 pouces 1366 x 768 Convertible 2 en 1 Windows 10 Pro 64 bits (renouvelé)",
    price: 100,
    originalPrice: 150,
    images: [
      '/products/Dell Latitude 3189/1.jpg',
      '/products/Dell Latitude 3189/2.jpg',
      '/products/Dell Latitude 3189/3.jpg',
      '/products/Dell Latitude 3189/4.jpg',
      '/products/Dell Latitude 3189/5.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel Pentium N4200 (1,1 GHz)' },
      { id: 'spec2', name: 'RAM', value: '8GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '32GB ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces tactile' }
    ],
    warranty: '1 mois',
    condition: 'moyen',
    stock: 8,
    category: 'laptop',
    brand: 'Dell',
    model: 'Dell Latitude 3189',
    productType: 'laptop',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '5',
    name: 'Chromebook 11 Dell',
    description: "Dell 11.6-inch 2-in-1  Chromebook, Processeur Intel Celeron jusqu'à 2,48 GHz, 4GB Ram 16GB SSD, HDMI, WiFi, Bluetooth, webcam HD intégrée, lecteur de carte SD,2x USB 3.1, 1x HDMI, 1x prise casque/micro,,Chrome OS ",
    price: 60,
    originalPrice: 150,
    images: [
      '/products/Chromebook 11 Dell/1.jpg',
      '/products/Chromebook 11 Dell/2.jpg',
      '/products/Chromebook 11 Dell/3.jpg', 
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: "Intel Celeron jusqu'à 2,48 GHz" },
      { id: 'spec2', name: 'RAM', value: '4GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '16GB ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces' }
    ],
    warranty: '1 mois',
    condition: 'moyen',
    stock: 8,
    category: 'laptop',
    brand: 'Dell',
    model: 'Dell Latitude 3189',
    productType: 'laptop',
    createdAt: new Date('2024-02-05')
  },
  {
    id: '6',
    name: 'Dell latitude 3150',
    description: " - Système installé : Windows 10- Taille de l'ecran: 11 pouces- RAM: 4GB ddr3 (20$ de plus pour 8Gb)- Disque dur: 128gb ssd -->80$ 256gb ssd --> 120$ - 2heures d'autonomie garantie. Cependant, elles sont généralement plus.",
    price: 80,
    originalPrice: 120,
    images: [
      '/products/Laptop Dell latitude 3150/1.jpg',
      '/products/Laptop Dell latitude 3150/2.jpg',
      '/products/Laptop Dell latitude 3150/3.jpg',
      '/products/Laptop Dell latitude 3150/4.jpg',
      '/products/Laptop Dell latitude 3150/6.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Système', value: 'Windows 10' },
      { id: 'spec2', name: 'Écran', value: '11 pouces' },
      { id: 'spec3', name: 'RAM', value: '4GB ddr3' },
      { id: 'spec4', name: 'Stockage', value: '128gb ssd' }
    ],
    warranty: '2 mois',
    condition: 'moyen',
    stock: 8,
    category: 'laptop',
    brand: 'Dell',
    model: 'Dell latitude 3150',
    productType: 'laptop',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '7',
    name: 'Toshiba Tactile core i5 8th gen',
    description: "Toshiba Tecra tactile avec processeur Intel Core i5 8ème génération, performance et polyvalence.",
    price: 300,
    originalPrice: 320,
    images: [
      '/products/Toshiba Tactile core i5 8th gen/1.jpg',
      '/products/Toshiba Tactile core i5 8th gen/2.jpg',
      '/products/Toshiba Tactile core i5 8th gen/3.jpg',
      '/products/Toshiba Tactile core i5 8th gen/4.jpg',
      '/products/Toshiba Tactile core i5 8th gen/5.jpg',
      '/products/Toshiba Tactile core i5 8th gen/6.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel core i5 8th gen' },
      { id: 'spec2', name: 'RAM', value: '16GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '256gb ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces tactile' }
    ],
    warranty: '1 mois',
    condition: 'excellent',
    stock: 8,
    category: 'laptop',
    brand: 'Toshiba Tecra',
    model: 'Toshiba Tactile core i5 8th gen',
    productType: 'laptop',
    createdAt: new Date('2024-02-15')
  }, 
  {
    id: '8',
    name: 'Dell Latitude 3400',
    description: "Dell Latitude 3400 professionnel avec processeur Intel Core i5 8ème génération, idéal pour les entreprises.",
    price: 200,
    originalPrice: 250,
    images: [
      '/products/Dell Latitude 3400/1.jpg',
      '/products/Dell Latitude 3400/2.jpg',
      '/products/Dell Latitude 3400/3.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel core i5 8th gen' },
      { id: 'spec2', name: 'RAM', value: '8 GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '256gb ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces' }
    ],
    warranty: '1 mois',
    condition: 'excellent',
    stock: 8,
    category: 'laptop',
    brand: 'Dell',
    model: 'Dell Latitude 3400',
    productType: 'laptop',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '9',
    name: 'Chromebook Tactile Azus',
    description: " ASUS Ordinateur portable Chromebook, écran HD de 11,6 pouces, 4 Go de RAM LPDDR4X, stockage eMMC 16 Go, durabilité MIL-STD 810H, ChromeOS, gris minéra Chromebook pour professionnels. Adapter pour suivre ces cours ou formations n'importe où.  Pliable 180° Tactile 4go de Ram 64gb de disque dur ssd ",
    price: 100,
    originalPrice: 150,
    images: [
      '/products/chromebook tactile asus/1.jpg',
      '/products/chromebook tactile asus/2.jpg',
      '/products/chromebook tactile asus/3.jpg',
      '/products/chromebook tactile asus/4.jpg'
    ],
    specifications: [
      { id: 'spec1', name: 'Processeur', value: 'Intel core i5 8th gen' },
      { id: 'spec2', name: 'RAM', value: '4 GO Ram' },
      { id: 'spec3', name: 'Stockage', value: '64gb ssd' },
      { id: 'spec4', name: 'Écran', value: '11,6 Pouces tactile' }
    ],
    warranty: '1 mois',
    condition: 'excellent',
    stock: 8,
    category: 'laptop',
    brand: 'Dell',
    model: 'Chromebook Tactile Azus',
    productType: 'laptop',
    createdAt: new Date('2024-02-25')
  },
  // {
  //   id: '4',
  //   name: 'SSD Samsung 970 EVO',
  //   brand: 'Samsung',
  //   model: '970 EVO',
  //   price: 89,
  //   originalPrice: 129,
  //   category: 'part',
  //   subcategory: 'storage',
  //   condition: 'excellent',
  //   specs: ['1TB NVMe', '3500 MB/s', 'M.2 2280'],
  //   images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop'],
  //   rating: 4.7,
  //   reviews: 456,
  //   inStock: 15,
  //   warranty: '24 mois',
  //   description: 'SSD NVMe ultra-rapide pour améliorer les performances de votre système.',
  //   features: ['NVMe', 'Ultra-rapide', 'Fiable', 'Garantie étendue']
  // },
  // {
  //   id: '5',
  //   name: 'iPhone 14 Pro',
  //   brand: 'Apple',
  //   model: 'iPhone 14 Pro',
  //   price: 899,
  //   originalPrice: 1199,
  //   category: 'laptop',
  //   condition: 'excellent',
  //   specs: ['A16 Bionic', '128GB', '6.1" ProMotion', 'Face ID'],
  //   images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop'],
  //   rating: 4.9,
  //   reviews: 340,
  //   inStock: 7,
  //   warranty: '12 mois',
  //   description: 'iPhone 14 Pro reconditionné, état impeccable avec toutes les fonctionnalités.',
  //   features: ['Dynamic Island', 'Pro Camera', '5G', 'MagSafe']
  // },
  // {
  //   id: '6',
  //   name: 'RAM Corsair 32GB DDR4',
  //   brand: 'Corsair',
  //   model: 'Vengeance LPX',
  //   price: 149,
  //   originalPrice: 199,
  //   category: 'part',
  //   subcategory: 'memory',
  //   condition: 'very-good',
  //   specs: ['32GB (2x16GB)', 'DDR4-3200', 'CL16'],
  //   images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop'],
  //   rating: 4.7,
  //   reviews: 156,
  //   inStock: 12,
  //   warranty: '18 mois',
  //   description: 'Kit mémoire haute performance pour gaming et création de contenu.',
  //   features: ['RGB', 'Overclocking', 'Garantie étendue', 'Profil XMP']
  // }
];

const categories = [
  { id: 'all', name: 'Tous les produits', icon: Grid3X3, count: mockProducts.length },
  { id: 'laptop', name: 'Ordinateurs portables', icon: Laptop, count: mockProducts.filter(p => p.category === 'laptop').length },
  { id: 'part', name: 'Pièces détachées', icon: Cpu, count: mockProducts.filter(p => p.category === 'part').length }
];



const brands = ['Apple', 'Lenovo', 'Dell', 'HP', 'ASUS', 'Samsung', 'Intel', 'AMD'];
const conditions = [
  { id: 'excellent', name: 'Excellent', color: 'text-green-400' },
  { id: 'very-good', name: 'Très bon', color: 'text-blue-400' },
  { id: 'good', name: 'Bon', color: 'text-yellow-400' }
];

export const BuyPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>('standard');

  const filterRef = useRef<HTMLDivElement>(null);

  const { cart, addToCart: addItem, removeFromCart: removeItem, getTotalItems, getTotalPrice } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedBrands.length > 0 && product.brand && !selectedBrands.includes(product.brand)) return false;
    if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) return false;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        product.brand && !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
        return priceA - priceB;
      }
      case 'price-high': {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
        return priceB - priceA;
      }
      case 'newest': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });



  const addToCart = (productId: string) => {
    addItem(productId);
    toast.success(`${mockProducts.find(p => p.id === productId)?.name} ajouté au panier !`);
  };

  const handleToggleFavorite = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    const isCurrentlyFavorite = isFavorite(productId);
    
    toggleFavorite(productId);
    
    if (isCurrentlyFavorite) {
      toast.error(`${product?.name} retiré des favoris`);
    } else {
      toast.success(`${product?.name} ajouté aux favoris !`);
    }
  };

  const removeFromCart = (productId: string) => {
    removeItem(productId);
    toast.error(`${mockProducts.find(p => p.id === productId)?.name} retiré du panier.`);
  };

  const buyNow = (productId: string) => {
    addItem(productId);
    toast.success(`${mockProducts.find(p => p.id === productId)?.name} ajouté au panier !`);
    setShowCheckout(true);
  };

  const getDeliveryPrice = () => {
    const deliveryOptions = [
      { id: 'standard', price: 0 },
      { id: 'express', price: 15 },
      { id: 'pickup', price: 0 }
    ];
    const selectedOption = deliveryOptions.find(option => option.id === selectedDeliveryMethod);
    return selectedOption ? selectedOption.price : 0;
  };

  const getFinalTotal = () => {
    return getTotalPrice(mockProducts) + getDeliveryPrice();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-cyber opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/10 to-neutral-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center pt-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <Shield className="w-5 h-5 text-primary-400" />
              <span className="font-medium">Tech Premium Reconditionnée</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            >
              Market<span className="text-gradient">Place</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xl text-white/70 max-w-3xl mx-auto mb-8"
            >
              Découvrez notre sélection d'ordinateurs portables et pièces détachées reconditionnés 
              avec une qualité premium et des prix imbattables
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher un produit, une marque..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors text-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gradient-to-r from-neutral-900/80 via-primary-900/10 to-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          {selectedCategory === 'part' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4"
            >
              {/* Computer Models for Parts */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-bold text-center mb-4 text-secondary-300">
                  Choisissez votre modèle d'ordinateur
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'macbook-pro-13', name: 'MacBook Pro 13"', brand: 'Apple', icon: '💻' },
                    { id: 'macbook-pro-16', name: 'MacBook Pro 16"', brand: 'Apple', icon: '💻' },
                    { id: 'thinkpad-x1', name: 'ThinkPad X1', brand: 'Lenovo', icon: '💻' },
                    { id: 'dell-xps-13', name: 'XPS 13', brand: 'Dell', icon: '💻' },
                    { id: 'hp-elitebook', name: 'EliteBook', brand: 'HP', icon: '💻' },
                    { id: 'asus-zenbook', name: 'ZenBook', brand: 'ASUS', icon: '💻' },
                    { id: 'surface-laptop', name: 'Surface Laptop', brand: 'Microsoft', icon: '💻' },
                    { id: 'gaming-laptop', name: 'Gaming Series', brand: 'Divers', icon: '🎮' }
                  ].map((model) => (
                    <motion.button
                      key={model.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedModel(selectedModel === model.id ? '' : model.id)}
                      className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                        selectedModel === model.id
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white/80'
                      }`}
                    >
                      <div className="text-2xl mb-2">{model.icon}</div>
                      <div className="font-bold text-sm">{model.name}</div>
                      <div className="text-xs opacity-70">{model.brand}</div>
                    </motion.button>
                  ))}
                </div>
                
                {selectedModel && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 glass-dark rounded-2xl border border-primary-500/20"
                  >
                    <div className="flex items-center mb-4">
                      <Cpu className="w-6 h-6 text-primary-400 mr-3" />
                      <h4 className="text-xl font-bold">Pièces disponibles pour ce modèle</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Écran LCD/OLED', price: '299', icon: Monitor, stock: 15 },
                        { name: 'Clavier', price: '89', icon: Laptop, stock: 23 },
                        { name: 'Batterie', price: '129', icon: Battery, stock: 12 },
                        { name: 'RAM 8GB/16GB', price: '149', icon: MemoryStick, stock: 8 },
                        { name: 'SSD 256GB/512GB', price: '179', icon: HardDrive, stock: 18 },
                        { name: 'Carte mère', price: '399', icon: Cpu, stock: 5 }
                      ].map((part, index) => (
                        <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary-400/50 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <part.icon className="w-6 h-6 text-secondary-400" />
                            <span className="text-xs text-green-400">Stock: {part.stock}</span>
                          </div>
                          <h5 className="font-bold mb-2">{part.name}</h5>
                          <div className="flex items-center justify-between">
                            <span className="text-primary-400 font-bold">{part.price}$ CAD</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => addToCart(`${selectedModel}-${part.name.toLowerCase()}`)}
                                className="p-2 bg-secondary-500/20 hover:bg-secondary-500/40 rounded-lg transition-colors"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => buyNow(`${selectedModel}-${part.name.toLowerCase()}`)}
                                className="p-2 bg-primary-500/20 hover:bg-primary-500/40 rounded-lg transition-colors"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-12 relative ${theme === 'light' ? 'bg-white' : ''}`}>
        {theme === 'light' ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/5 via-transparent to-primary-900/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Filtres</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`lg:hidden ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>

                <div
                  className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
                  ref={filterRef}
                >
                  {/* Price Range */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === 'light' 
                      ? 'bg-white shadow-lg border-gray-200' 
                      : 'glass-dark border-primary-500/20 bg-gradient-to-br from-primary-900/10 to-secondary-900/10'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-primary-300'}`}>Prix</h4>
                    <div className="space-y-3">
                      <div className={`flex justify-between text-sm ${theme === 'light' ? 'text-gray-600' : 'text-white/70'}`}>
                        <span>{priceRange[0]} $</span>
                        <span>{priceRange[1]} $</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                          theme === 'light' 
                            ? 'bg-gray-200' 
                            : 'bg-white/20'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Marques */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === 'light' 
                      ? 'bg-white shadow-lg border-gray-200' 
                      : 'glass-dark border-secondary-500/20 bg-gradient-to-br from-secondary-900/10 to-purple-900/10'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-secondary-300'}`}>Marques</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                            selectedBrands.includes(brand)
                              ? 'bg-primary-500 border-primary-500'
                              : theme === 'light' 
                                ? 'border-gray-300' 
                                : 'border-white/30'
                          }`}>
                            {selectedBrands.includes(brand) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* État */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === 'light' 
                      ? 'bg-white shadow-lg border-gray-200' 
                      : 'glass-dark border-accent-500/20 bg-gradient-to-br from-accent-900/10 to-green-900/10'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-accent-300'}`}>État</h4>
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <label key={condition.id} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedConditions.includes(condition.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedConditions([...selectedConditions, condition.id]);
                              } else {
                                setSelectedConditions(selectedConditions.filter(c => c !== condition.id));
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                            selectedConditions.includes(condition.id)
                              ? 'bg-primary-500 border-primary-500'
                              : theme === 'light' 
                                ? 'border-gray-300' 
                                : 'border-white/30'
                          }`}>
                            {selectedConditions.includes(condition.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${condition.color}`}>{condition.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center space-x-4">
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-white/70'}>
                    {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid' 
                          ? 'bg-primary-500 text-white' 
                          : theme === 'light' 
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                            : 'bg-white/10 text-white'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list' 
                          ? 'bg-primary-500 text-white' 
                          : theme === 'light' 
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                            : 'bg-white/10 text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`border rounded-lg px-4 py-2 focus:outline-none focus:border-primary-400 ${
                      theme === 'light' 
                        ? 'bg-white border-gray-300 text-gray-900' 
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    <option value="featured">Mis en avant</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                    <option value="newest">Plus récents</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                  {sortedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      isFavorite={isFavorite(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={addToCart}
                      onBuyNow={buyNow}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-20">
                  <Search className={`w-20 h-20 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-white/30'}`} />
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Aucun produit trouvé</h3>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-white/60'}>Essayez de modifier vos critères de recherche</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={addToCart}
        />
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-dark max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <ShoppingCart className="w-6 h-6 text-primary-400 mr-3" />
                    <h2 className="text-2xl font-bold">Mon Panier</h2>
                  </div>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {getTotalItems() === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Votre panier est vide</h3>
                    <p className="text-white/60">Ajoutez des produits pour commencer vos achats</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {Object.entries(cart).map(([productId, quantity]) => {
                        const product = mockProducts.find(p => p.id === productId);
                        if (!product) return null;
                        
                        return (
                          <div key={productId} className="flex items-center space-x-4 p-4 glass-dark rounded-2xl">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold">{product.name}</h4>
                              <p className="text-white/60 text-sm">{product.brand}</p>
                              <p className="text-primary-400 font-bold">
                                {(typeof product.price === 'string' ? parseFloat(product.price) : product.price)}$ CAD
                              </p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => removeFromCart(productId)}
                                className="p-1 hover:bg-white/10 rounded-full"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold">{quantity}</span>
                              <button
                                onClick={() => addToCart(productId)}
                                className="p-1 hover:bg-white/10 rounded-full"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(productId)}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-full ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg">Total ({getTotalItems()} articles)</span>
                        <span className="text-2xl font-bold text-primary-400">{getTotalPrice(mockProducts)}$ CAD</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowCart(false)}
                          className="flex-1 btn-secondary py-3 rounded-xl font-semibold"
                        >
                          Continuer mes achats
                        </button>
                        <button
                          onClick={() => {
                            setShowCart(false);
                            setShowCheckout(true);
                          }}
                          className="flex-1 btn-primary py-3 rounded-xl font-semibold flex items-center justify-center"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Passer commande
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <AnimatePresence>
        {showFavoritesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFavoritesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-dark max-w-4xl w-full max-h-[80vh] overflow-y-auto rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-pink-400 mr-3" />
                    <h2 className="text-2xl font-bold">Mes Favoris</h2>
                  </div>
                  <button
                    onClick={() => setShowFavoritesModal(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {mockProducts.filter(p => isFavorite(p.id)).length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Aucun favori pour le moment</h3>
                    <p className="text-white/60 mb-6">Ajoutez des produits à vos favoris pour les retrouver ici</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {mockProducts.filter(p => isFavorite(p.id)).map((product) => (
                        <div key={product.id} className="flex items-center space-x-4 p-4 glass-dark rounded-2xl">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">{product.name}</h4>
                            <p className="text-white/60 text-xs">{product.brand}</p>
                            <p className="text-pink-400 font-bold text-sm">
                              {(typeof product.price === 'string' ? parseFloat(product.price) : product.price)}$ CAD
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                addToCart(product.id);
                                toast.success(`${product.name} ajouté au panier !`);
                              }}
                              className="p-2 hover:bg-white/10 rounded-full"
                              title="Ajouter au panier"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                toggleFavorite(product.id);
                                toast.error(`${product.name} retiré des favoris`);
                              }}
                              className="p-2 hover:bg-red-500/20 text-red-400 rounded-full"
                              title="Retirer des favoris"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg">Total ({mockProducts.filter(p => isFavorite(p.id)).length} favoris)</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowFavoritesModal(false)}
                          className="flex-1 btn-secondary py-3 rounded-xl font-semibold"
                        >
                          Fermer
                        </button>
                        <Link
                          to="/favoris"
                          onClick={() => setShowFavoritesModal(false)}
                          className="flex-1 btn-primary py-3 rounded-xl font-semibold flex items-center justify-center"
                        >
                          <Heart className="w-5 h-5 mr-2" />
                          Voir tous les favoris
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cartItems={cart}
          products={mockProducts}
          selectedDeliveryMethod={selectedDeliveryMethod}
          onDeliveryMethodChange={setSelectedDeliveryMethod}
          getTotalPrice={() => getTotalPrice(mockProducts)}
          getDeliveryPrice={getDeliveryPrice}
          getFinalTotal={getFinalTotal}
        />
      </AnimatePresence>

      {/* Floating Favorites Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-20 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-2xl z-40"
        onClick={() => setShowFavoritesModal(true)}
      >
        <Heart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {mockProducts.filter(p => isFavorite(p.id)).length}
        </span>
      </motion.button>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-2xl z-40"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
        </motion.button>
      )}

    </div>
  );
};