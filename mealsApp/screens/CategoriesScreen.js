import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, } from 'react-native';

const CategoriesScreen = ({ navigation, }) => {

  return (
    <FlatList numColumns={2} />
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default CategoriesScreen;