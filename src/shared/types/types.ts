/**
 * Product Types
 */
export type ProductId = string;

export type Product = {
  _id: ProductId;
  name: string;
  price: number;
  unitMeasure: string;
  title: string;
  description: string;
  iconUrl: string;
  category: string;
};

/**
 * Categoty Types
 */
export type CategoryId = string;
export type Category = {
  _id: CategoryId;
  name: string;
  productsCount: number;
  iconUrl: string;
  products: Product[];
};

/**
 * User Types
 */
export type UserId = string;

export type User = {
  _id: UserId;
  username: string;
  password: string;
  avatar: string;
  is_admin: boolean;
  is_auth: boolean;
  cart: CartId;
};

/**
 * Cart Types
 */
export type CartId = string;

export type Cart = {
  _id: CartId;
  user: UserId;
  productsCount: number;
  total: number;
  products: CartProduct[];
  productsOverflow: ProductId[];
  timestamp: number;
  isClientOk: boolean;
};

export type CartProduct = {
  count: number;
  product: Product;
  isMaxCount?: boolean;
};

/**
 * Cart Update Types
 */
export type CartProductUpdate = {
  count: number;
  product: ProductId;
};

export type CartUpdate = {
  userId: UserId;
  products: CartProductUpdate[];
};

/**
 * PaginationWrapper Type
 */

export type PaginationWrapper<T> = {
  data: T;
  length: number;
  page: number;
  limit: number;
  lastPage: number;
};
