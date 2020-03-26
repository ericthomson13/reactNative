import React from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';

import MealItem from '../components/MealItem';

import { CATEGORIES, MEALS, } from '../data/dummy-data';

const CategoriesMealsScreen = ({ navigation, }) => {
  const catId = navigation.getParam('categoryId');
  const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0 );

  const renderMealItem = (itemData) => {
    const { title, duration, affordability, complexity, imageUrl, } = itemData.item;
    return (
      <MealItem 
        title={title}
        onSelectMeal={() => {}}
        duration={duration}
        affordability={affordability}
        complexity={complexity}
        imageUrl={imageUrl}
      />
    );
  };

  return (
    <View style={styles.screen} >
      <Text>
        Category Meals Screen
      </Text>
      <FlatList data={displayedMeals} renderItem={renderMealItem} style={{width: '100%'}} />
    </View>
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default CategoriesMealsScreen;