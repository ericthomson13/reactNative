import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('https://rn-shopping-app-a9d2d.firebaseio.com/products.json');
      if (!res.ok) {
        throw new Error('Something went wrong with getting products');
      }
      const resData = await res.json();
      const loadedProducts = [];
      for (let key in resData) {
        loadedProducts.push(new Product(
          key, 
          'u1', 
          resData[key].title, 
          resData[key].imageUrl, 
          resData[key].description, 
          resData[key].price
        ));
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  }
}
export const deleteProduct = (productId) =>({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) =>{
    const res = await fetch('https://rn-shopping-app-a9d2d.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    });

    const resData = await res.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      }
    });
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
 
  return async (dispatch) => { 
    const res = await fetch(`https://rn-shopping-app-a9d2d.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    const resData = await res.json();

    return dispatch({ 
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl,
      }
    });
  };
};
