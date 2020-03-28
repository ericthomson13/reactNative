import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = ({
  imageUrl,
  title,
  price,
  onViewDetail,
  onAddToCart,
}) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
      <View style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={onViewDetail} useForeground>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl, }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="VIEW DETAILS" onPress={onViewDetail} color={Colors.primary}/>
              <Button title="ADD TO CART" onPress={onAddToCart} color={Colors.primary}/>
            </View>
          </TouchableCmp>
        </View>
      </View> 
  );
};

const styles = StyleSheet.create({
  product: {
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
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14, 
    color: '#888',
    fontFamily: 'open-sans',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  }
});

export default ProductItem;