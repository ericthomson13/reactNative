import React from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';

import MealItem from './MealItem';

const MealList = ({ listData, navigation, }) => {
  const renderMealItem = (itemData) => {
    const { title, duration, affordability, complexity, imageUrl, id, } = itemData.item;
    return (
      <MealItem 
        title={title}
        onSelectMeal={() => navigation.navigate({ 
          routeName: 'MealDetail', 
          params: {
            mealId: id,
            mealTitle: title,
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
