export interface IService {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  currentPrice: number;
  images: string[];
  category: "Phun môi" | "Xăm môi" | "Khác";
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginCredentials {
  name: string;
}

export interface ServiceDiscount {
  serviceId: string;
  originalPrice: number;
  discountedPrice: number;
}

export interface ImageItem {
  _id: string;
  src: string;
  alt: string;
  category: string;
  type?: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
  isDiscounted: boolean;
  promotionId: string;
  promotionTitle: string;
}

export interface Promotion {
  _id: string;
  title: string;
  description: string;
  image?: string;
  details: string[];
  startDate: string;
  endDate: string;
  serviceDiscounts: ServiceDiscount[];
  promoCode?: string;
  status: "active" | "upcoming" | "expired";
  isApplied: boolean;
  displayDiscountPercent: number;
}
