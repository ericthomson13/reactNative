import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    
  return async (dispatch) => {
    try {
      const res = await fetch('https://rn-shopping-app-a9d2d.firebaseio.com/orders/u1.json');

      if (!res.ok) {
        throw new Error('Something went wrong with getting orders');
      }

      const resData = await res.json();
      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(new Order(
          key, 
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        ));
      }

      dispatch({
        type: SET_ORDERS,
        payload: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  }
}


export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const res = await fetch('https://rn-shopping-app-a9d2d.firebaseio.com/orders/u1.json', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      }),
    });
    if (res.ok) {
      throw new Error('Something Went Wrong with Your Order');
    }

    const resData = await res.json();

    return dispatch({
      type: ADD_ORDER,
      payload: {
        items: cartItems,
        amount: totalAmount,
        id: resData.name,
        date,
      }
    })
  }
};