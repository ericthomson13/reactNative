import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
  <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    alignItems: 'center',
    // these shadow props only work on iOS
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    backgroundColor: 'white',
    // these elevation props only work on Android
    elevation: 5,
    borderRadius: 10,
    
  },
});

export default Card;