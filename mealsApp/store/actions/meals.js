
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (mealId) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: mealId,
  };
};