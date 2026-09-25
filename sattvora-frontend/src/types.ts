export interface HerbComposition {
  herb: string;
  qty: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  hindi: string;
  tagline: string;
  description: string;
  size: string;
  mrp: number;
  costPrice: number;
  markup: number; // percentage
  sellingPrice: number;
  category: string;
  color: string;
  accentColor: string;
  batchNo: string;
  mfgDate: string;
  expiry: string;
  licNo: string;
  composition: HerbComposition[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface Order {
  id: string
  items: CartItem[]
  shipping: ShippingInfo
  paymentMethod: string
  subtotal: number
  shippingCost: number
  total: number
  date: string
  status: string
}
