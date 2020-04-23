import React from 'react';
import { createStackNavigator, } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View, } from 'react-native';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createDrawerNavigator, DrawerItems, } from 'react-navigation-drawer';
// import { createSwitchNavigator } from 'react-navigation-switch-transitioner';
import { useDispatch, } from 'react-redux';

import { Ionicons, } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

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
  EditProducts: EditProductsScreen,
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
  },
  contentComponent: (props) => {
    const dispatch = useDispatch();

    return (
      <View style={{ flex: 1, padding: 20, }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} />
          <Button
            title='logout'
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate('Auth');
            }}
          />
        </SafeAreaView>
      </View>
    )
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
