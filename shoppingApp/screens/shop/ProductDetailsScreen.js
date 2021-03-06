import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = ({ navigation, }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state) => state.products.availableProducts.find((prod) => prod.id === productId));

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl}} style={styles.image} />
      <View style={styles.actions}>
        <Button 
          title="Add to Cart" 
          onPress={() => {dispatch(cartActions.addToCart(selectedProduct))}} 
          color={Colors.primary} 
        />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam('productTitle')
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  }
});

export default ProductDetailsScreen;
