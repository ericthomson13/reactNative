import { ADD_ORDER } from '../actions/order';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

const ordersReducer =  (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER: 
      const newOrder = new Order(new Date().toString(), payload.items, payload.amount, new Date());
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      }
    default:
      return state;
  }
};

export default ordersReducer;
