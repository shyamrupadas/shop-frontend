import { Cart, CartProductUpdate, UserId } from 'shared/types';
import { axiosInstance } from '../axiosInstance';

export const fetchCartByUserId = async (userId: UserId): Promise<Cart> => {
  try {
    const response = await axiosInstance.get<Cart>(`/carts/${userId}`);
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCartByUserId = async (
  userId: UserId,
  cartUpdateProducts: CartProductUpdate[],
): Promise<Cart> => {
  try {
    const response = await axiosInstance.put<Cart>(`/carts/${userId}`, {
      user: userId,
      products: cartUpdateProducts,
    });

    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
