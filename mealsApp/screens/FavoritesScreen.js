import React from 'react';
import { useSelector, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import { View, StyleSheet, } from 'react-native';

import CustomHeaderButton from '../components/CustomHeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({ navigation, }) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No Favorites Selected</DefaultText>
      </View>
    );
  }
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default FavoritesScreen;
