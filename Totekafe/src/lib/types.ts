export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  isCourse?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
