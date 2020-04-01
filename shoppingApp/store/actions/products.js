export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (productId) =>({
  type: DELETE_PRODUCT,
  payload: productId,
})