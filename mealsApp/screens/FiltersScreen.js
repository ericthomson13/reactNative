import React, { useState, useEffect, useCallback, } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { useDispatch, } from 'react-redux';

import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import FilterSwitch from '../components/FilterSwitch';

import { setFilters } from '../store/actions/meals';

const FiltersScreen = ({ navigation, }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen} >
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch 
        label='Gluten Free' 
        value={isGlutenFree} 
        onValueChange={(newValue) => setIsGlutenFree(newValue)} 
      />
      <FilterSwitch 
        label='Lactose Free' 
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch 
        label='Vegan' 
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch 
        label='Vegetarian' 
        value={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  )
};

FiltersScreen.navigationOptions = (navData) => ({
  headerTitle: 'Filters',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="Menu"
        iconName="ios-menu"
        onPress={() => {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="Save"
        iconName="ios-save"
        onPress={navData.navigation.getParam('save')}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'open-sans-bold',
    margin: 20,
    textAlign: 'center',
  }
});

export default FiltersScreen;