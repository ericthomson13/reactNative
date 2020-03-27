import React from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';

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

CategoriesScreen.navigationOptions = (navData) => ({
  headerTitle: 'Meal Categories',
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default CategoriesScreen;