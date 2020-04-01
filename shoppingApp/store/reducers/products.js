import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';


const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productsReducer = (state = initialState, { type, payload, }) => {
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== payload),
        availableProducts: state.userProducts.filter((product) => product.id !== payload),
      }
    default: 
      return state;
  }
};

export default productsReducer;