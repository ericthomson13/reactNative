import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator, } from 'react-navigation-material-bottom-tabs';
import { Platform, } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreens from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import colors from '../constants/colors';

const defaultStackNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' || 'web' ? colors.primaryColor : '',
    },
    headerTintColor: Platform.OS === 'android' || 'web' ? 'white' : colors.primaryColor,
  }
};

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailsScreens,
}, defaultStackNavOptions);

const favNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetails: MealDetailsScreens,
}, defaultStackNavOptions);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: colors.primaryColor,
    }
  },
  Favorites: {
    screen: favNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: colors.accentColor,
    }
  },
};

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeTintColor: 'white',
  shifting: true,
})
: createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    activeTintColor: colors.accentColor,
  }
});


export default createAppContainer(MealsFavTabNavigator);
