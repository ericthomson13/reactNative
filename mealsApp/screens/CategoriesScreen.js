import React from 'react';
import { StyleSheet, FlatList, } from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation, }) => {
  const renderGridItem = (itemData) => (
    <CategoryGridTile 
      title={itemData.item.title} 
      onSelect={() => navigation.navigate({ 
        routeName: 'CategoryMeals', 
        params: {
          categoryId: itemData.item.id,
        }, 
        })
      }
      color={itemData.item.color}
    />
  );
  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  )
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default CategoriesScreen;