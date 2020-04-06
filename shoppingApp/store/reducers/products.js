import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS, } from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productsReducer = (state = initialState, { type, payload, }) => {
  switch (type) {
    case SET_PRODUCTS: 
      return {
        ...state,
        availableProducts: payload,
        userProducts: payload.filter((prod) => prod.ownerId === 'u1'),
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== payload),
        availableProducts: state.userProducts.filter((product) => product.id !== payload),
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex((prod) => prod.id === payload.id);
      const updatedProduct = new Product(
        payload.id,
        state.userProducts[productIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === payload.id);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    default: 
      return state;
  }
};

export default productsReducer;