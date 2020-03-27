import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreens from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import { Platform } from 'react-native';

import colors from '../constants/colors';

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailsScreens,
}, 
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' || 'web' ? colors.primaryColor : '',
    },
    headerTintColor: Platform.OS === 'android' || 'web' ? 'white' : colors.primaryColor,
  }
});

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      }
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
      }
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.accentColor,
  }
});


export default createAppContainer(MealsFavTabNavigator);
