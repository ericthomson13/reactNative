import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, } from 'react-native';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite, } from '../store/actions/meals';

const ListItem = ({ children, }) => (
  <View style={styles.listItem}>
    <DefaultText>{children}</DefaultText>
  </View>
);

const MealDetailsScreen = ({ navigation, }) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector((state) => {
    return state.meals.favoriteMeals.some((meal) => meal.id === mealId);
  });
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details} >
        <DefaultText>{selectedMeal.duration}</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((i) => (
        <ListItem key={i} >{i}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step} >{step}</ListItem>
      ))}
    </ScrollView>
  )
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
        <Item title="favorite" iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite}/>
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
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});

export default MealDetailsScreen;