import React from 'react';
import { View, StyleSheet, Text, Button, } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = ({ amount, date, }) => {

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button title='show details' onPress={() => {}} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  total: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  }
});

export default OrderItem;