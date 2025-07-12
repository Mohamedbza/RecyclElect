import type { Product, ComputerModel, Part, Testimonial, CompanyInfo, ShippingOption, NavigationItem } from '../types';

// Données de l'entreprise
export const companyInfo: CompanyInfo & { videoUrl?: string; videoPoster?: string } = {
  name: "RecyclElect",
  description: "Spécialiste en matériels électroniques d'occasion, nous donnons une seconde vie aux ordinateurs portables et leurs pièces. Notre mission est de promouvoir la durabilité tout en offrant des solutions économiques et écologiques.",
  address: "123 Rue de l'Innovation, Montréal, QC H2X 1L1",
  phone: "+1 (514) 555-0123",
  email: "contact@itech.ca",
  policies: {
    returns: "30 jours pour retourner un produit défectueux",
    warranty: "6 mois de garantie sur tous nos produits",
    shipping: "Livraison gratuite au Canada pour commandes de plus de 100$"
  },
  videoUrl: "https://videos.pexels.com/video-files/4784092/4784092-hd_1920_1080_25fps.mp4",
  videoPoster: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
};

// Options de livraison
export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Livraison standard",
    price: 15.99,
    estimatedDays: "3-5 jours ouvrables",
    description: "Livraison par Postes Canada"
  },
  {
    id: "express",
    name: "Livraison express",
    price: 29.99,
    estimatedDays: "1-2 jours ouvrables",
    description: "Livraison prioritaire"
  },
  {
    id: "free",
    name: "Livraison gratuite",
    price: 0,
    estimatedDays: "3-5 jours ouvrables",
    description: "Pour commandes de plus de 100$"
  }
];

// Modèles d'ordinateurs avec images réelles
export const computerModels: ComputerModel[] = [
  {
    id: "macbook-pro-2019",
    name: 'MacBook Pro 13" 2019',
    brand: "Apple",
    year: 2019,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60",
    description: "MacBook Pro 13 pouces avec processeur Intel",
    availableParts: [
      "macbook-pro-2019-screen",
      "macbook-pro-2019-keyboard",
      "macbook-pro-2019-battery",
    ],
  },
  {
    id: "macbook-air-2020",
    name: 'MacBook Air 13" 2020',
    brand: "Apple",
    year: 2020,
    image:
      "https://images.unsplash.com/photo-1592336527950-c654e4c6320a?auto=format&fit=crop&w=800&q=60",
    description: "MacBook Air 13 pouces avec puce M1",
    availableParts: [
      "macbook-air-2020-screen",
      "macbook-air-2020-keyboard",
      "macbook-air-2020-battery",
    ],
  },
  {
    id: "dell-xps-13-2021",
    name: "Dell XPS 13 2021",
    brand: "Dell",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=60",
    description: "Dell XPS 13 pouces ultraportable",
    availableParts: [
      "dell-xps-13-2021-screen",
      "dell-xps-13-2021-keyboard",
      "dell-xps-13-2021-battery",
    ],
  },
  {
    id: "lenovo-thinkpad-x1",
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=60",
    description: "ThinkPad X1 Carbon pour professionnels",
    availableParts: [
      "lenovo-thinkpad-x1-screen",
      "lenovo-thinkpad-x1-keyboard",
      "lenovo-thinkpad-x1-battery",
    ],
  },
];

// Pièces de rechange avec images réelles
export const parts: Part[] = [
  {
    id: "macbook-pro-2019-screen",
    name: "Écran MacBook Pro 13\" 2019",
    description: "Écran LCD Retina 13 pouces pour MacBook Pro 2019, résolution 2560x1600",
    price: 299.99,
    originalPrice: 599.99,
    images: ["https://images.unsplash.com/photo-1591696205602-2f950c417cb1?auto=format&fit=crop&w=300&q=80"],
    specifications: [
      { id: 'spec1', name: "Taille", value: "13 pouces" },
      { id: 'spec2', name: "Résolution", value: "2560x1600" },
      { id: 'spec3', name: "Type", value: "Retina LCD" },
      { id: 'spec4', name: "Compatibilité", value: "MacBook Pro 2019" }
    ],
    warranty: "6 mois",
    condition: "excellent",
    stock: 3,
    category: "part",
    brand: "Apple",
    model: "MacBook Pro 2019",
    compatibleModels: ["macbook-pro-2019"],
    partType: "screen",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "macbook-pro-2019-keyboard",
    name: "Clavier MacBook Pro 13\" 2019",
    description: "Clavier rétroéclairé avec Touch Bar pour MacBook Pro 2019",
    price: 149.99,
    originalPrice: 299.99,
    images: ["https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&w=300&q=80"],
    specifications: [
      { id: 'spec1', name: "Type", value: "Rétroéclairé" },
      { id: 'spec2', name: "Fonctionnalités", value: "Touch Bar intégrée" },
      { id: 'spec3', name: "Compatibilité", value: "MacBook Pro 2019" }
    ],
    warranty: "6 mois",
    condition: "bon",
    stock: 5,
    category: "part",
    brand: "Apple",
    model: "MacBook Pro 2019",
    compatibleModels: ["macbook-pro-2019"],
    partType: "keyboard",
    createdAt: new Date("2024-01-20")
  },
  {
    id: "dell-xps-13-2021-battery",
    name: "Batterie Dell XPS 13 2021",
    description: "Batterie lithium-ion 52Wh pour Dell XPS 13 2021",
    price: 89.99,
    originalPrice: 179.99,
    images: ["https://images.unsplash.com/photo-1583595562161-a36a4d787961?auto=format&fit=crop&w=300&q=80"],
    specifications: [
      { id: 'spec1', name: "Capacité", value: "52Wh" },
      { id: 'spec2', name: "Type", value: "Lithium-ion" },
      { id: 'spec3', name: "Compatibilité", value: "Dell XPS 13 2021" }
    ],
    warranty: "6 mois",
    condition: "excellent",
    stock: 8,
    category: "part",
    brand: "Dell",
    model: "XPS 13 2021",
    compatibleModels: ["dell-xps-13-2021"],
    partType: "battery",
    createdAt: new Date("2024-02-01")
  }
];

// Ordinateurs portables avec images spécifiques
export const laptops: Product[] = [
  {
    id: "macbook-pro-2019-complete",
    name: "MacBook Pro 13\" 2019 - Complet",
    description: "MacBook Pro 13 pouces 2019 en excellent état, processeur Intel Core i5, 8GB RAM, 256GB SSD",
    price: 899.99,
    originalPrice: 1799.99,
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"],
    specifications: [
      { id: 'spec1', name: "Processeur", value: "Intel Core i5 8th Gen" },
      { id: 'spec2', name: "RAM", value: "8GB DDR4" },
      { id: 'spec3', name: "Stockage", value: "256GB SSD" },
      { id: 'spec4', name: "Écran", value: "13\" Retina 2560x1600" },
      { id: 'spec5', name: "Système", value: "macOS Monterey" }
    ],
    warranty: "6 mois",
    condition: "excellent",
    stock: 2,
    category: "laptop",
    brand: "Apple",
    model: "MacBook Pro 2019",
    createdAt: new Date("2024-01-10")
  },
  {
    id: "dell-xps-13-2021-complete",
    name: "Dell XPS 13 2021 - Complet",
    description: "Dell XPS 13 2021 ultraportable, processeur Intel Core i7, 16GB RAM, 512GB SSD",
    price: 799.99,
    originalPrice: 1599.99,
    images: ["https://images.unsplash.com/photo-1606220588913-b3fac2c175b9?auto=format&fit=crop&w=800&q=80"],
    specifications: [
      { id: 'spec1', name: "Processeur", value: "Intel Core i7 11th Gen" },
      { id: 'spec2', name: "RAM", value: "16GB DDR4" },
      { id: 'spec3', name: "Stockage", value: "512GB SSD" },
      { id: 'spec4', name: "Écran", value: "13.4\" FHD+ InfinityEdge" },
      { id: 'spec5', name: "Système", value: "Windows 11" }
    ],
    warranty: "6 mois",
    condition: "bon",
    stock: 1,
    category: "laptop",
    brand: "Dell",
    model: "XPS 13 2021",
    createdAt: new Date("2024-01-25")
  },
  {
    id: "lenovo-thinkpad-x1-complete",
    name: "Lenovo ThinkPad X1 Carbon - Complet",
    description: "ThinkPad X1 Carbon pour professionnels, processeur Intel Core i5, 8GB RAM, 256GB SSD",
    price: 649.99,
    originalPrice: 1299.99,
    images: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80"],
    specifications: [
      { id: 'spec1', name: "Processeur", value: "Intel Core i5 11th Gen" },
      { id: 'spec2', name: "RAM", value: "8GB DDR4" },
      { id: 'spec3', name: "Stockage", value: "256GB SSD" },
      { id: 'spec4', name: "Écran", value: "14\" FHD IPS" },
      { id: 'spec5', name: "Système", value: "Windows 11" }
    ],
    warranty: "6 mois",
    condition: "moyen",
    stock: 3,
    category: "laptop",
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon",
    createdAt: new Date("2024-02-05")
  }
];

// Témoignages clients
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Marie Dubois",
    title: "Développeuse Web",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Excellent service ! J'ai trouvé l'écran de remplacement pour mon MacBook Pro à un prix imbattable. Livraison rapide et produit en parfait état.",
    date: new Date("2024-01-20"),
    productType: 'part',
  },
  {
    id: "testimonial-2",
    name: "Jean Tremblay",
    title: "Étudiant en génie",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Le ThinkPad que j'ai acheté est comme neuf. Le processus de commande était simple et l'équipe a été très réactive pour répondre à mes questions.",
    date: new Date("2024-02-10"),
    productType: 'laptop',
  },
  {
    id: "testimonial-3",
    name: "Aïcha Diallo",
    title: "Graphiste Freelance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Rapport qualité-prix incroyable. Mon Dell XPS est une bête de course et j'ai économisé près de 50%. Je recommande à 100% !",
    date: new Date("2024-02-15"),
    productType: 'laptop',
  }
];

// Navigation
export const navigationItems: NavigationItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Marketplace", path: "/j-achete" },
  { label: "Nous contacter", path: "/nous-contacter" }
];

// Produits phares pour la page d'accueil
export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Tecra Harman - tactile",
    category: "Laptop",
    price: "300$",
    imageUrl: "/products/Tecra Harman - tactile/1.jpg",
    specs: "Core i5 8ème gen, 16GB RAM, 256GB SSD, Tactile",
    description: "30 jours de garantie 2 heures d'autonomie garantie, mais vont généralement au delà.",
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
    brand: 'Toshiba',
    model: 'MacBook Pro',
    productType: 'laptop',
    createdAt: new Date('2024-01-15')
  },
  {
    id: "5",
    name: "Chromebook 11 Dell",
    category: "Laptop",
    price: "60$",
    imageUrl: "/products/Chromebook 11 Dell/1.jpg",
    specs: "Intel Celeron, 4GB RAM, 16GB SSD, 11.6\"",
    description: "Dell 11.6-inch 2-in-1  Chromebook, Processeur Intel Celeron jusqu'à 2,48 GHz, 4GB Ram 16GB SSD, HDMI, WiFi, Bluetooth, webcam HD intégrée, lecteur de carte SD,2x USB 3.1, 1x HDMI, 1x prise casque/micro,,Chrome OS",
    images: [
      '/products/Chromebook 11 Dell/1.jpg',
      '/products/Chromebook 11 Dell/2.jpg',
      '/products/Chromebook 11 Dell/3.jpg'
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
    brand: 'Dell',
    model: 'Dell Latitude 3189',
    productType: 'laptop',
    createdAt: new Date('2024-02-05')
  },
  {
    id: "7",
    name: "Toshiba Tactile core i5 8th gen",
    category: "Laptop",
    price: "300$",
    imageUrl: "/products/Toshiba Tactile core i5 8th gen/1.jpg",
    specs: "Intel Core i5 8th gen, 16GB RAM, 256GB SSD, 11.6\" tactile",
    description: "Toshiba Tecra tactile avec processeur Intel Core i5 8ème génération, performance et polyvalence.",
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
    brand: 'Toshiba Tecra',
    model: 'Toshiba Tactile core i5 8th gen',
    productType: 'laptop',
    createdAt: new Date('2024-02-15')
  },
  {
    id: "9",
    name: "Chromebook Tactile Asus",
    category: "Laptop",
    price: "100$",
    imageUrl: "/products/chromebook tactile asus/1.jpg",
    specs: "Intel Core i5, 4GB RAM, 64GB SSD, 11.6\" tactile",
    description: "ASUS Ordinateur portable Chromebook, écran HD de 11,6 pouces, 4 Go de RAM LPDDR4X, stockage eMMC 16 Go, durabilité MIL-STD 810H, ChromeOS, gris minéra Chromebook pour professionnels. Adapter pour suivre ces cours ou formations n'importe où. Pliable 180° Tactile 4go de Ram 64gb de disque dur ssd",
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
    brand: 'Asus',
    model: 'Chromebook Tactile Asus',
    productType: 'laptop',
    createdAt: new Date('2024-02-25')
  }
]; 