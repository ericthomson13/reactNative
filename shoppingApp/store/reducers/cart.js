import { ADD_TO_CART, } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, { type, payload, }) => {
  switch (type) {
    case ADD_TO_CART:
      const addedProduct = payload;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if(state.items[addedProduct.id]) {
        // already have item in cart
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice,
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCartItem,
          },
          totalAmount: state.totalAmount + productPrice,
        }
      } else {
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: newCartItem,
          },
          totalAmount: state.totalAmount + productPrice,
        }
      }
    default:
      return state;
  }
};

export default cartReducer;
