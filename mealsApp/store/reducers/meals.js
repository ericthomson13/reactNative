import { MEALS, } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS, } from '../actions/meals';

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
    case SET_FILTERS:
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (payload.glutenFree && !meal.isGlutenFree) return false;
        if (payload.lactoseFree && !meal.isLactoseFree) return false;
        if (payload.vegetarian && !meal.isVegetarian) return false;
        if (payload.vegan && !meal.isVegan) return false;
        return true;
      });
      return {
        ...state,
        filteredMeals: updatedFilteredMeals,
      }
    default:
      return state;
  }
};

export default mealsReducer;
