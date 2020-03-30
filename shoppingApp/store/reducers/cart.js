import { ADD_TO_CART, REMOVE_FROM_CART, } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/order';

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
      };
      
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[payload];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1, 
          selectedCartItem.productPrice, 
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [payload]: updatedCartItem,
        }
      } else {
        const updatedCartItems = { ...state.items };
        delete updatedCartItems[payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER: 
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
