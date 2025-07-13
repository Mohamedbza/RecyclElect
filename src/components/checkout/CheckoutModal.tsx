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
  ArrowRight
} from "lucide-react";
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
  price: number;
  icon: any;
  options: {
    id: string;
    name: string;
    price: number;
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
      { id: 'storage-1tb', name: '1To', price: 100 },
      { id: 'storage-500gb', name: '500Go', price: 60 },
      { id: 'storage-256gb', name: '256Go', price: 40 },
      { id: 'storage-128gb', name: '128Go', price: 0 }
    ]
  },
  {
    id: 'ram',
    name: 'RAM',
    description: 'Améliorez les performances',
    price: 0,
    icon: CircuitBoard,
    options: [
      { id: 'ram-32gb', name: '32 Gb', price: 95 },
      { id: 'ram-16gb', name: '16 Gb', price: 45 },
      { id: 'ram-8gb', name: '8 Gb', price: 25 },
      { id: 'ram-4gb', name: '4 Gb', price: 0 }
    ]
  },
  {
    id: 'mouse',
    name: 'Souris',
    description: 'Souris externe neuve',
    price: 0,
    icon: MousePointer,
    options: [
      { id: 'mouse-wireless', name: 'Sans fil', price: 20 },
      { id: 'mouse-wired', name: 'Avec fil', price: 15 }
    ]
  },
  {
    id: 'keyboard',
    name: 'Clavier',
    description: 'Clavier externe neuf',
    price: 0,
    icon: Keyboard,
    options: [
      { id: 'keyboard-wireless', name: 'Sans fil', price: 35 },
      { id: 'keyboard-wired', name: 'Avec fil', price: 25 }
    ]
  },
  {
    id: 'battery',
    name: 'Batterie',
    description: 'Autonomie de la batterie',
    price: 0,
    icon: BatteryCharging,
    options: [
      { id: 'battery-new', name: 'Neuve', price: 70 },
      { id: 'battery-2h', name: '2h garantie', price: 0 }
    ]
  },
  {
    id: 'bag',
    name: 'Sac neuf',
    description: 'Protection et transport',
    price: 0,
    icon: Briefcase,
    options: [
      { id: 'bag-backpack', name: 'À dos', price: 80 },
      { id: 'bag-hand', name: 'À main', price: 70 },
      { id: 'bag-briefcase', name: 'Cartable', price: 70 }
    ]
  },
  {
    id: 'headphones',
    name: 'Écouteur neuf',
    description: 'Audio de qualité',
    price: 0,
    icon: Headphones,
    options: [
      { id: 'headphones-gaming', name: 'Casque de jeu', price: 70 },
      { id: 'headphones-classic', name: 'Casque classique', price: 35 }
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpgradeChange = (categoryId: string, optionId: string) => {
    setSelectedUpgrades(prev => ({
      ...prev,
      [categoryId]: optionId
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      showHeader={false}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          {currentStep === 'upgrades' ? (
            <>
              <CircuitBoard className="w-6 h-6 text-primary-400 mr-3" />
              <h2 className="text-2xl font-bold">Choisissez vos améliorations</h2>
            </>
          ) : (
            <>
              <CreditCard className="w-6 h-6 text-primary-400 mr-3" />
              <h2 className="text-2xl font-bold">Finaliser ma commande</h2>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {currentStep === 'upgrades' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h3 className="text-xl font-bold mb-4">Résumé de commande</h3>
            <div className="space-y-3 mb-6">
              {Object.entries(cartItems).map(([productId, quantity]) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;
                
                return (
                  <div key={productId} className="flex justify-between items-center p-3 glass-dark rounded-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-white/60">Qté: {quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-primary-400">
                      {(typeof product.price === 'string' ? parseFloat(product.price) : product.price) * quantity}$ CAD
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center text-lg">
                <span>Sous-total</span>
                <span>{getTotalPrice()}$ CAD</span>
              </div>
              {getUpgradesTotal() > 0 && (
                <div className="flex justify-between items-center text-lg">
                  <span>Améliorations</span>
                  <span className="text-secondary-400">+{getUpgradesTotal()}$ CAD</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-bold text-primary-400 mt-2">
                <span>Total</span>
                <span>{getFinalTotalWithUpgrades()}$ CAD</span>
              </div>
            </div>
          </div>

          {/* Upgrades Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Améliorations disponibles</h3>
            <div className="space-y-6">
              {upgradeOptions.map((category) => (
                <div key={category.id} className="glass-dark rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <category.icon className="w-5 h-5 text-secondary-400 mr-2" />
                    <div>
                      <h4 className="font-bold">{category.name}</h4>
                      <p className="text-sm text-white/60">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.options.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all ${
                          selectedUpgrades[category.id] === option.id
                            ? 'border-primary-400 bg-primary-400/10'
                            : 'border-white/10 hover:border-primary-400/50'
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
                        <div className="flex-1">
                          <p className="font-medium">{option.name}</p>
                          <p className={`text-sm ${option.price === 0 ? 'text-green-400' : 'text-primary-400'}`}>
                            {option.price === 0 ? 'Gratuit' : `+${option.price}$ CAD`}
                          </p>
                        </div>
                        <div className="w-4 h-4 border-2 border-primary-400 rounded-full flex items-center justify-center">
                          {selectedUpgrades[category.id] === option.id && (
                            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep('payment')}
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="w-full mt-8"
            >
              Continuer vers le paiement - {getFinalTotalWithUpgrades()}$ CAD
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary with Delivery */}
          <div>
            <h3 className="text-xl font-bold mb-4">Résumé de commande</h3>
            <div className="space-y-3 mb-6">
              {Object.entries(cartItems).map(([productId, quantity]) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;
                
                return (
                  <div key={productId} className="flex justify-between items-center p-3 glass-dark rounded-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-white/60">Qté: {quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-primary-400">
                      {(typeof product.price === 'string' ? parseFloat(product.price) : product.price) * quantity}$ CAD
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Selected Upgrades Summary */}
            {Object.entries(selectedUpgrades).length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold mb-2">Améliorations sélectionnées</h4>
                <div className="space-y-2">
                  {Object.entries(selectedUpgrades).map(([categoryId, optionId]) => {
                    const category = upgradeOptions.find(cat => cat.id === categoryId);
                    const option = category?.options.find(opt => opt.id === optionId);
                    if (!category || !option) return null;

                    return (
                      <div key={categoryId} className="flex justify-between items-center p-2 glass-dark rounded-lg">
                        <div className="flex items-center">
                          <category.icon className="w-4 h-4 text-secondary-400 mr-2" />
                          <span>{category.name} - {option.name}</span>
                        </div>
                        <span className={option.price === 0 ? "text-green-400" : "text-primary-400"}>
                          {option.price === 0 ? 'Gratuit' : `${option.price}$ CAD`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery Options */}
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-secondary-400" />
              Options de livraison
            </h3>
            <div className="space-y-3 mb-6">
              {deliveryOptions.map((option) => (
                <label key={option.id} className={`flex items-center p-4 glass-dark rounded-xl cursor-pointer hover:border-primary-400/50 border transition-all ${
                  selectedDeliveryMethod === option.id 
                    ? 'border-primary-400 bg-primary-400/10' 
                    : 'border-white/10'
                }`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value={option.id}
                    checked={selectedDeliveryMethod === option.id}
                    onChange={(e) => onDeliveryMethodChange(e.target.value)}
                    className="sr-only" 
                  />
                  <div className="w-5 h-5 border-2 border-primary-400 rounded-full mr-4 flex items-center justify-center">
                    {selectedDeliveryMethod === option.id && (
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    )}
                  </div>
                  <option.icon className="w-5 h-5 text-secondary-400 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">{option.name}</p>
                    <p className="text-sm text-white/60">{option.time}</p>
                  </div>
                  <p className="font-bold text-primary-400">
                    {option.price === 0 ? 'Gratuit' : `${option.price}$ CAD`}
                  </p>
                </label>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center text-lg">
                <span>Sous-total</span>
                <span>{getTotalPrice()}$ CAD</span>
              </div>
              {getUpgradesTotal() > 0 && (
                <div className="flex justify-between items-center text-lg">
                  <span>Améliorations</span>
                  <span className="text-secondary-400">+{getUpgradesTotal()}$ CAD</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg">
                <span>Livraison</span>
                <span className={getDeliveryPrice() === 0 ? "text-green-400" : "text-white"}>
                  {getDeliveryPrice() === 0 ? 'Gratuit' : `${getDeliveryPrice()}$ CAD`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-primary-400 mt-2">
                <span>Total</span>
                <span>{getFinalTotalWithUpgrades()}$ CAD</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Informations de paiement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                type="email"
                label="Adresse email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="votre@email.com"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Prénom"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
                <FormField
                  type="text"
                  label="Nom"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>

              <FormField
                type="text"
                label="Adresse"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Rue Example"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Ville"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
                <FormField
                  type="text"
                  label="Code postal"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="A1A 1A1"
                  required
                />
              </div>

              <FormField
                type="text"
                label="Numéro de carte"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  type="text"
                  label="Date d'expiration"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="MM/AA"
                  required
                />
                <FormField
                  type="text"
                  label="CVV"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Shield}
                className="w-full mt-6"
              >
                Finaliser l'achat - {getFinalTotalWithUpgrades()}$ CAD
              </Button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};