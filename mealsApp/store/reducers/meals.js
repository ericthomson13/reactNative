import { MEALS, } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, { type, payload, }) => {
  switch (type) {
    case TOGGLE_FAVORITE: 
      const existingIndex = state.favoriteMeals.findIndex((meal) => meal.id === payload);
      if (existingIndex >= 0) {
        const updatedFavMeals = [ ...state.favoriteMeals ];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const updatedFavMeals = [ ...state.favoriteMeals ];
        const meal = state.meals.find((meal) => meal.id === payload);
        return {
          ...state,
          favoriteMeals: updatedFavMeals.concat(meal),
        };
      }
    default:
      return state;
  }
};

export default mealsReducer;
