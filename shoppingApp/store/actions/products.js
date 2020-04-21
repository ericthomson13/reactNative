import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userId, } = getState().auth;

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
        payload: {
          loadedProducts,
          userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
        },
      });
    } catch (err) {
      throw err;
    }
  }
};

export const deleteProduct = (productId) =>{
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const res = await fetch(`https://rn-shopping-app-a9d2d.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );

    if (res.ok) {
      throw new Error('Unable to Update Product');
    }

    return dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) =>{
    const { token, userId, } = getState().auth;

    const res = await fetch(`https://rn-shopping-app-a9d2d.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
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
        ownerId: userId,
      }
    });
  }
};

export const updateProduct = (id, title, description, imageUrl) => {

  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const res = await fetch(`https://rn-shopping-app-a9d2d.firebaseio.com/products/${id}.json?auth=${token}`, {
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

    if (res.ok) {
      throw new Error('Unable to Update Product');
    }

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
