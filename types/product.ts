export interface Product {
  id: string;
  name: string;
  sku: string;
  basePrice: number;
  category: {
    name: string;
  };
  supplier?: {
    name: string;
  };
}