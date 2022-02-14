import axios from 'axios';
import { Cart, CartProductUpdate, UserId } from 'shared/types';

const SERVER_URL = 'https://sbermarket-internship.herokuapp.com';

export async function fetchCartByUserId(userId: UserId): Promise<Cart> {
  try {
    const response = await axios.get<Cart>(`${SERVER_URL}/carts/${userId}`);
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCartByUserId(
  userId: UserId,
  cartUpdateProducts: CartProductUpdate[],
): Promise<Cart> {
  try {
    const response = await axios.put<Cart>(`${SERVER_URL}/carts/${userId}`, {
      user: userId,
      products: cartUpdateProducts,
    });

    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
