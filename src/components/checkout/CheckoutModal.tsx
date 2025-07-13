import { useState } from "react";
import {
  CreditCard,
  X,
  Truck,
  Package,
  Clock,
  MapPin,
  Shield,
  HardDrive,
  CircuitBoard,
  MousePointer,
  Keyboard,
  BatteryCharging,
  Briefcase,
  Headphones,
  ArrowRight,
  Check,
  Star,
  Zap,
  Gift,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Info,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, FormField, Button } from "../shared";
import type { Product } from "../shared/ProductCard";

interface DeliveryOption {
  id: string;
  name: string;
  time: string;
  price: number;
  icon: any;
}

interface UpgradeOption {
  id: string;
  name: string;
  description: string;
  price: 0;
  icon: any;
  options: {
    id: string;
    name: string;
    price: number;
    popular?: boolean;
    recommended?: boolean;
    deliveryTime?: string;
  }[];
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { [key: string]: number };
  products: Product[];
  selectedDeliveryMethod: string;
  onDeliveryMethodChange: (method: string) => void;
  getTotalPrice: () => number;
  getDeliveryPrice: () => number;
  getFinalTotal: () => number;
  onSubmit?: () => void;
}

const deliveryOptions: DeliveryOption[] = [
  { id: 'standard', name: 'Livraison standard', time: '5-7 jours', price: 0, icon: Package },
  { id: 'express', name: 'Livraison express', time: '2-3 jours', price: 15, icon: Clock },
  { id: 'pickup', name: 'Ramassage en magasin', time: 'Disponible aujourd\'hui', price: 0, icon: MapPin }
];

const upgradeOptions: UpgradeOption[] = [
  {
    id: 'storage',
    name: 'Disque Dur',
    description: 'Augmentez votre espace de stockage',
    price: 0,
    icon: HardDrive,
    options: [
      { id: 'storage-128gb', name: '128GB SSD', price: 0, deliveryTime: '3-5 jours' },
      { id: 'storage-256gb', name: '256GB SSD', price: 40, popular: true, deliveryTime: '7-14 jours' },
      { id: 'storage-500gb', name: '500GB SSD', price: 60, recommended: true, deliveryTime: '7-14 jours' },
      { id: 'storage-1tb', name: '1TB SSD', price: 100, deliveryTime: '7-14 jours' }
    ]
  },
  {
    id: 'ram',
    name: 'Mémoire RAM',
    description: 'Améliorez les performances',
    price: 0,
    icon: CircuitBoard,
    options: [
      { id: 'ram-4gb', name: '4GB', price: 0, deliveryTime: '5 jours' },
      { id: 'ram-8gb', name: '8GB', price: 25, popular: true, deliveryTime: '7-14 jours' },
      { id: 'ram-16gb', name: '16GB', price: 45, recommended: true, deliveryTime: '7-14 jours' },
      { id: 'ram-32gb', name: '32GB', price: 95, deliveryTime: '7-14 jours' }
    ]
  },
  {
    id: 'battery',
    name: 'Batterie',
    description: 'Autonomie garantie',
    price: 0,
    icon: BatteryCharging,
    options: [
      { id: 'battery-2h', name: '2h garantie', price: 0, deliveryTime: '3-5 jours' },
      { id: 'battery-new', name: 'Batterie neuve', price: 70, recommended: true, deliveryTime: '7-28 jours' }
    ]
  },
  {
    id: 'mouse',
    name: 'Souris Externe Neuve',
    description: 'Souris de qualité pour votre ordinateur',
    price: 0,
    icon: MousePointer,
    options: [
      { id: 'mouse-wireless', name: 'Souris sans fil', price: 20, deliveryTime: '7-14 jours' },
      { id: 'mouse-wired', name: 'Souris avec fil', price: 15, deliveryTime: '7-14 jours' }
    ]
  },
  {
    id: 'keyboard',
    name: 'Clavier Externe Neuf',
    description: 'Clavier de qualité pour votre ordinateur',
    price: 0,
    icon: Keyboard,
    options: [
      { id: 'keyboard-wireless', name: 'Clavier sans fil', price: 35, deliveryTime: '7-14 jours' },
      { id: 'keyboard-wired', name: 'Clavier avec fil', price: 25, deliveryTime: '7-14 jours' }
    ]
  },
  {
    id: 'bag',
    name: 'Sac Neuf',
    description: 'Protégez et transportez votre ordinateur',
    price: 0,
    icon: Briefcase,
    options: [
      { id: 'bag-backpack', name: 'Sac à dos', price: 45, popular: true, deliveryTime: '7-14 jours' },
      { id: 'bag-hand', name: 'Sac à main', price: 40, deliveryTime: '7-14 jours' },
      { id: 'bag-briefcase', name: 'Cartable', price: 50, deliveryTime: '7-14 jours' }
    ]
  },
  {
    id: 'headphones',
    name: 'Écouteurs Neufs',
    description: 'Audio de qualité pour votre ordinateur',
    price: 0,
    icon: Headphones,
    options: [
      { id: 'headphones-classic', name: 'Casque classique', price: 30, deliveryTime: '7-14 jours' },
      { id: 'headphones-gaming', name: 'Casque de jeu', price: 60, recommended: true, deliveryTime: '7-14 jours' }
    ]
  }
];

export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  products,
  selectedDeliveryMethod,
  onDeliveryMethodChange,
  getTotalPrice,
  getDeliveryPrice,
  getFinalTotal,
  onSubmit
}: CheckoutModalProps) => {
  const [currentStep, setCurrentStep] = useState<'upgrades' | 'payment'>('upgrades');
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [selectedUpgrades, setSelectedUpgrades] = useState<{ [key: string]: string }>({});
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    storage: true,
    ram: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpgradeChange = (categoryId: string, optionId: string) => {
    setSelectedUpgrades(prev => ({
      ...prev,
      [categoryId]: optionId
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getUpgradesTotal = () => {
    return Object.entries(selectedUpgrades).reduce((total, [categoryId, optionId]) => {
      const category = upgradeOptions.find(cat => cat.id === categoryId);
      const option = category?.options.find(opt => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
  };

  const getFinalTotalWithUpgrades = () => {
    return getFinalTotal() + getUpgradesTotal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  const getSelectedUpgradesCount = () => {
    return Object.keys(selectedUpgrades).length;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="6xl"
      showHeader={false}
      className="p-0 sm:p-0"
    >
      <div className="relative bg-white text-gray-900 min-h-[90vh] sm:min-h-[80vh] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {currentStep === 'upgrades' ? (
                    <div className="p-1.5 sm:p-2 bg-primary-100 rounded-lg">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                    </div>
                  ) : (
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                      {currentStep === 'upgrades' ? 'Personnalisez' : 'Finaliser'}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
                      {currentStep === 'upgrades' 
                        ? 'Sélectionnez vos améliorations préférées' 
                        : 'Vérifiez et confirmez votre commande'
                      }
                    </p>
                  </div>
                </div>
                
                {/* Progress Steps - Hidden on mobile */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    currentStep === 'upgrades' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                    <span className="text-sm font-medium">
                      {currentStep === 'upgrades' ? 'Personnalisation' : 'Paiement'}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {currentStep === 'upgrades' ? '1' : '2'} / 2
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Mobile Summary Toggle */}
                <button
                  onClick={() => setShowMobileSummary(!showMobileSummary)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Summary Overlay */}
        <AnimatePresence>
          {showMobileSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setShowMobileSummary(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Résumé</h3>
                    <button
                      onClick={() => setShowMobileSummary(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Mobile Order Summary Content */}
                  <div>
                    <h4 className="font-medium mb-3">Votre commande</h4>
                    <div className="space-y-2">
                      {Object.entries(cartItems).map(([productId, quantity]) => {
                        const product = products.find(p => p.id === productId);
                        if (!product) return null;
                        
                        return (
                          <div key={productId} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs truncate">{product.name}</p>
                              <p className="text-xs text-gray-500">Qté: {quantity}</p>
                            </div>
                            <p className="font-bold text-primary-600 text-sm">
                              {(typeof product.price === 'string' ? parseFloat(product.price) : product.price) * quantity}$
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Upgrades Summary */}
                  {Object.entries(selectedUpgrades).length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Améliorations ({getSelectedUpgradesCount()})</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedUpgrades).map(([categoryId, optionId]) => {
                          const category = upgradeOptions.find(cat => cat.id === categoryId);
                          const option = category?.options.find(opt => opt.id === optionId);
                          if (!category || !option) return null;

                          return (
                            <div key={categoryId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <category.icon className="w-3 h-3 text-gray-500" />
                                <div className="flex flex-col">
                                  <span className="text-xs">{option.name}</span>
                                  {option.deliveryTime && (
                                    <span className="text-xs text-gray-400">
                                      <Clock className="w-2 h-2 inline mr-1" />
                                      {option.deliveryTime}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className={`text-xs font-medium ${option.price === 0 ? 'text-green-600' : 'text-secondary-600'}`}>
                                {option.price === 0 ? 'Inclus' : `+${option.price}$`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mobile Price Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="text-gray-900">{getTotalPrice()}$</span>
                    </div>
                    {getUpgradesTotal() > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Améliorations</span>
                        <span className="text-secondary-600">+{getUpgradesTotal()}$</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Livraison</span>
                      <span className={getDeliveryPrice() === 0 ? "text-green-600" : "text-gray-900"}>
                        {getDeliveryPrice() === 0 ? 'Gratuit' : `${getDeliveryPrice()}$`}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary-600">{getFinalTotalWithUpgrades()}$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 sm:p-8 pb-20 lg:pb-8">
              <AnimatePresence mode="wait">
                {currentStep === 'upgrades' ? (
                  <motion.div
                    key="upgrades"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Upgrade Categories */}
                    {upgradeOptions.map((category) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                              <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-base sm:text-lg text-gray-900">{category.name}</h3>
                              <p className="text-gray-600 text-xs sm:text-sm">{category.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            {selectedUpgrades[category.id] && (
                              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-primary-100 rounded-full">
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                                <span className="text-xs sm:text-sm text-primary-600 hidden sm:inline">Sélectionné</span>
                              </div>
                            )}
                            {expandedCategories[category.id] ? (
                              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedCategories[category.id] && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-gray-50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                  {category.options.map((option) => (
                                    <motion.label
                                      key={option.id}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`relative flex items-center p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer border-2 transition-all ${
                                        selectedUpgrades[category.id] === option.id
                                          ? 'border-primary-500 bg-primary-50'
                                          : 'border-gray-200 hover:border-gray-300 bg-white'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={category.id}
                                        value={option.id}
                                        checked={selectedUpgrades[category.id] === option.id}
                                        onChange={() => handleUpgradeChange(category.id, option.id)}
                                        className="sr-only"
                                      />
                                      
                                      {/* Option Content */}
                                      <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                                          <span className="font-medium text-sm sm:text-base text-gray-900">{option.name}</span>
                                          <div className="flex space-x-1 mt-1 sm:mt-0">
                                            {option.popular && (
                                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                                                Populaire
                                              </span>
                                            )}
                                            {option.recommended && (
                                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                                Recommandé
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                          <p className={`text-xs sm:text-sm font-semibold ${
                                            option.price === 0 ? 'text-green-600' : 'text-primary-600'
                                          }`}>
                                            {option.price === 0 ? 'Inclus' : `+${option.price}$ CAD`}
                                          </p>
                                          {option.deliveryTime && (
                                            <p className="text-xs text-gray-500 mt-1 sm:mt-0">
                                              <Clock className="w-3 h-3 inline mr-1" />
                                              {option.deliveryTime}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {/* Radio Button */}
                                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                        selectedUpgrades[category.id] === option.id
                                          ? 'border-primary-500 bg-primary-500'
                                          : 'border-gray-300'
                                      }`}>
                                        {selectedUpgrades[category.id] === option.id && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                                          />
                                        )}
                                      </div>
                                      
                                      {/* Selection Indicator */}
                                      {selectedUpgrades[category.id] === option.id && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.5 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-500 rounded-full p-0.5 sm:p-1"
                                        >
                                          <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                        </motion.div>
                                      )}
                                    </motion.label>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                    
                    {/* Special Offer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                          <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-gray-900">Offre spéciale !</h3>
                          <p className="text-gray-700 text-sm sm:text-base">
                            Ajoutez 3 améliorations ou plus et obtenez 10% de réduction sur les accessoires
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* Delivery Options */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center text-gray-900">
                        <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
                        Options de livraison
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {deliveryOptions.map((option) => (
                          <motion.label
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex flex-col items-center p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer border-2 transition-all ${
                              selectedDeliveryMethod === option.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="delivery"
                              value={option.id}
                              checked={selectedDeliveryMethod === option.id}
                              onChange={(e) => onDeliveryMethodChange(e.target.value)}
                              className="sr-only"
                            />
                            <option.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-primary-600" />
                            <h4 className="font-medium mb-1 text-gray-900 text-sm sm:text-base text-center">{option.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center">{option.time}</p>
                            <p className={`font-bold text-sm sm:text-base ${option.price === 0 ? 'text-green-600' : 'text-primary-600'}`}>
                              {option.price === 0 ? 'Gratuit' : `${option.price}$ CAD`}
                            </p>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center text-gray-900">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                        Informations de paiement
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            label="Prénom"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Entrez votre prénom"
                            required
                          />
                          <FormField
                            label="Nom"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Entrez votre nom"
                            required
                          />
                        </div>
                        
                        <FormField
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="exemple@email.com"
                          required
                        />
                        
                        <FormField
                          label="Adresse"
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="123 Rue de la Paix"
                          required
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            label="Ville"
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Montréal"
                            required
                          />
                          <FormField
                            label="Code postal"
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="H1A 1A1"
                            required
                          />
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                          <FormField
                            label="Numéro de carte"
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <FormField
                              label="Date d'expiration"
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              placeholder="MM/AA"
                              required
                            />
                            <FormField
                              label="CVV"
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden lg:flex lg:flex-col w-80 bg-gray-50 border-l border-gray-200 min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Votre commande</h3>
                <div className="space-y-3">
                  {Object.entries(cartItems).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    
                    return (
                      <div key={productId} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">Qté: {quantity}</p>
                        </div>
                        <p className="font-bold text-primary-600">
                          {(typeof product.price === 'string' ? parseFloat(product.price) : product.price) * quantity}$
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Upgrades */}
              {Object.entries(selectedUpgrades).length > 0 && (
                <div>
                  <h4 className="font-bold mb-3 flex items-center text-gray-900">
                    <Zap className="w-4 h-4 mr-2 text-secondary-600" />
                    Améliorations ({getSelectedUpgradesCount()})
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedUpgrades).map(([categoryId, optionId]) => {
                      const category = upgradeOptions.find(cat => cat.id === categoryId);
                      const option = category?.options.find(opt => opt.id === optionId);
                      if (!category || !option) return null;

                      return (
                        <div key={categoryId} className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <category.icon className="w-4 h-4 text-gray-500" />
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-900">{option.name}</span>
                              {option.deliveryTime && (
                                <span className="text-xs text-gray-500">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {option.deliveryTime}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${option.price === 0 ? 'text-green-600' : 'text-secondary-600'}`}>
                            {option.price === 0 ? 'Inclus' : `+${option.price}$`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="text-gray-900">{getTotalPrice()}$ CAD</span>
                </div>
                {getUpgradesTotal() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Améliorations</span>
                    <span className="text-secondary-600">+{getUpgradesTotal()}$ CAD</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livraison</span>
                  <span className={getDeliveryPrice() === 0 ? "text-green-600" : "text-gray-900"}>
                    {getDeliveryPrice() === 0 ? 'Gratuit' : `${getDeliveryPrice()}$ CAD`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-primary-600">{getFinalTotalWithUpgrades()}$ CAD</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentStep === 'upgrades' ? (
                  <Button
                    onClick={() => setCurrentStep('payment')}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                  >
                    Continuer ({getFinalTotalWithUpgrades()}$ CAD)
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    icon={Shield}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Finaliser l'achat
                  </Button>
                )}
              </motion.div>

              {/* Back Button */}
              {currentStep === 'payment' && (
                <button
                  onClick={() => setCurrentStep('upgrades')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  ← Retour aux améliorations
                </button>
              )}

              {/* Security Info */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Paiement sécurisé SSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-bold text-lg text-primary-600">{getFinalTotalWithUpgrades()}$ CAD</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {Object.keys(cartItems).length} article{Object.keys(cartItems).length > 1 ? 's' : ''}
                {getSelectedUpgradesCount() > 0 && ` + ${getSelectedUpgradesCount()} amélioration${getSelectedUpgradesCount() > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep === 'upgrades' ? (
              <Button
                onClick={() => setCurrentStep('payment')}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              >
                Continuer vers le paiement
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  icon={Shield}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Finaliser l'achat
                </Button>
                <button
                  onClick={() => setCurrentStep('upgrades')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm py-2"
                >
                  ← Retour aux améliorations
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};