import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, } from 'react-native';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

import { MEALS, } from '../data/dummy-data';

const MealDetailsScreen = ({ navigation, }) => {
  const mealId = navigation.getParam('mealId');
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details} >
        <DefaultText>{selectedMeal.duration}</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <Text>List of Ingredients</Text>
      <Text style={styles.title}>Steps</Text>
      <Text>List of Steps</Text>
    </ScrollView>
    
  )
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
        <Item title="favorite" iconName='ios-star' onPress={() => {}}/>
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
});

export default MealDetailsScreen;