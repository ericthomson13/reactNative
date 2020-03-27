import React from 'react';
import MealList from '../components/MealList';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import { useSelector, } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';

const FavoritesScreen = ({ navigation, }) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);
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
