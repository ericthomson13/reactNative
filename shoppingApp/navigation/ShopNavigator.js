import React from 'react';
import { createStackNavigator, } from 'react-navigation-stack';
import { Platform, } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons, } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS !== 'ios' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS !== 'ios' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetails: ProductDetailsScreen,
  Cart: CartScreen,
}, {
  navigationOptions: {
    drawerIcon: (drawerConfig) => (
      <Ionicons
        name={Platform.OS !== 'ios' ? 'ios-list': 'md-list'}
        size={23}
        color={drawerConfig.tintColor} />
    )
  },
  defaultNavigationOptions: defaultNavOptions,
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen,
}, {
  navigationOptions: {
    drawerIcon: (drawerConfig) => (
      <Ionicons
        name={Platform.OS !== 'ios' ? 'ios-list': 'md-list'}
        size={23}
        color={drawerConfig.tintColor} />
    )
  },
  defaultNavigationOptions: defaultNavOptions,
});

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
}, {
  navigationOptions: {
    drawerIcon: (drawerConfig) => (
      <Ionicons
        name={Platform.OS !== 'ios' ? 'ios-create': 'md-create'}
        size={23}
        color={drawerConfig.tintColor} />
    )
  },
  defaultNavigationOptions: defaultNavOptions,
});

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary,
  }
});

export default createAppContainer(ShopNavigator);