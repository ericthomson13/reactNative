import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { useSelector, } from 'react-redux';

import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

import { CATEGORIES, } from '../data/dummy-data';

const CategoriesMealsScreen = ({ navigation, }) => {
  const catId = navigation.getParam('categoryId');
  const availableMeals = useSelector((state) => state.meals.filteredMeals)
  const displayedMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(catId) >= 0 );
  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe you should check filters?</DefaultText>
      </View>
    );
  }
  return (
   <MealList listData={displayedMeals} navigation={navigation} />
  );
};

CategoriesMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
});

export default CategoriesMealsScreen;