import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation, }) => {

  return (
    <FlatList data={CATEGORIES} renderItem={CategoryGridTile} numColumns={2} />
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