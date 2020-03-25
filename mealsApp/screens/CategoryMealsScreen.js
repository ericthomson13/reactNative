import React from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesMealsScreen = ({ navigation, }) => {

  return (
    <View style={styles.screen} >
      <Text>
        Category Meals Screen
      </Text>
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate({ routeName: 'MealDetail'})} 
      />
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
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