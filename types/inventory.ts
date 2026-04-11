export interface Inventory {
  id: string;
  quantity: number;
  reservedQty: number;
  damagedQty: number;

  product: {
    id: string;
    name: string;
    sku: string;
  };

  warehouse: {
    id: string;
    name: string;
  };
}