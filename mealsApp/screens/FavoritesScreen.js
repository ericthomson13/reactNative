import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';

import { MEALS, } from '../data/dummy-data';

const FavoritesScreen = ({ navigation, }) => {
  const favMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');

  return (
    <MealList listData={favMeals} navigation={navigation} />
  )
};

FavoritesScreen.navigationOptions = (navData) => ({
  headerTitle: 'Your Favorites',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="menu"
        iconName="ios-menu"
        onPress={() => {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  ),
});

export default FavoritesScreen;
