import { createStackNavigator, } from 'react-navigation-stack';
import { Platform, } from 'react-native';
import { createAppContainer, } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';

import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetails: ProductDetailsScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS !== 'ios' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS !== 'ios' ? 'white' : Colors.primary,
  }
});

export default createAppContainer(ProductsNavigator);