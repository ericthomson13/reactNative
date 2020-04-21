import React, { useState, } from 'react';
import { StyleSheet, } from 'react-native';
import { combineReducers, createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import { AppLoading, } from 'expo';
import * as Font from 'expo-font';
import thunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  return;
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
