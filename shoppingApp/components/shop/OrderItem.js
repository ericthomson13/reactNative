import React, { useState, } from 'react';
import { View, StyleSheet, Text, Button, } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = ({ amount, date, items, }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button title='show details' onPress={() => {setShowDetails((prev) => !prev)}} color={Colors.primary} />
      {showDetails && 
        <View>
          {items.map((item) => (
            <CartItem 
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
            />
          ))}
        </View>
      }
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
    marginBottom: 15,
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