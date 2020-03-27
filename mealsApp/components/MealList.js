import React from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import { useSelector, } from 'react-redux';

import MealItem from './MealItem';

const MealList = ({ listData, navigation, }) => {
  const favoritemeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const { title, duration, affordability, complexity, imageUrl, id, } = itemData.item;
    const isFavorite = favoritemeals.some((meal) => meal.id === id);
    return (
      <MealItem 
        title={title}
        onSelectMeal={() => navigation.navigate({ 
          routeName: 'MealDetail', 
          params: {
            mealId: id,
            mealTitle: title,
            isFav: isFavorite,
          } 
        })}
        duration={duration}
        affordability={affordability}
        complexity={complexity}
        imageUrl={imageUrl}
      />
    );
  };

  return (
    <View style={styles.list} >
      <FlatList data={listData} renderItem={renderMealItem} style={{width: '100%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MealList;
