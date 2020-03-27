import { MEALS, } from '../../data/dummy-data';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, { type, payload, }) => {
  switch (type) {

    default:
      return state;
  }
};

export default mealsReducer;
