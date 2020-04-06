import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import order from '../../store/reducers/order';

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  // add error handling here


  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: 
          <Text style={styles.amount}>${ Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {isLoading ? 
          (<ActivityIndicator size='small' color={Colors.primary} />) : 
          (<Button
            title="Order Now"
            color={Colors.accent}
            onPress={sendOrderHandler}
            disabled={cartItems.length === 0 ? true : false}
          />)
        }
      </Card>
      <FlatList 
        data={cartItems} 
        keyExtractor={(item) => item.productId} 
        renderItem={(itemData) => (
          <CartItem 
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            deleteable
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
}
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
