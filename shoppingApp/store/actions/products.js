import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch('https://rn-shopping-app-a9d2d.firebaseio.com/products.json');
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
    console.log('here');
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

export const updateProduct = (id, title, description, imageUrl) => ({
  type: UPDATE_PRODUCT,
  payload: {
    id,
    title,
    description,
    imageUrl,
  }
});

