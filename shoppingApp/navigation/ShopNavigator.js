import { createStackNavigator, } from 'react-navigation-stack';
import { Platform, } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  defaultNavigationOptions: {
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
  }
};

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetails: ProductDetailsScreen,
  Cart: CartScreen,
}, defaultNavOptions);

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen,
}, defaultNavOptions);

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary,
  }
});

export default createAppContainer(ShopNavigator);