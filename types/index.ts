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
