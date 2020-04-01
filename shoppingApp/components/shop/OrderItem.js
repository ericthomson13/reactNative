import React, { useState, } from 'react';
import { View, StyleSheet, Text, Button, } from 'react-native';

import CartItem from './CartItem';
import Card from '../UI/Card';

import Colors from '../../constants/Colors';

const OrderItem = ({ amount, date, items, }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={showDetails ? 'hide details' : 'show details'}
        onPress={() => {setShowDetails((prev) => !prev)}}
        color={Colors.primary}
      />
      {showDetails && 
        <View style={styles.detailItems}>
          {items.map((item) => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
            />
          ))}
        </View>
      }
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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
  },
  detailItems: {
    width: '100%',
  }
});

export default OrderItem;