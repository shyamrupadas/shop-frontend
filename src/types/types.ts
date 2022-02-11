export interface Product {
  _id: string;
  name: string;
  price: number;
  unitMeasure: string;
  title: string;
  description: string;
  iconUrl: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  productsCount: number;
  iconUrl: string;
  products: Product[];
}
