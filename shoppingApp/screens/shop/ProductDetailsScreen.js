import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, } from 'react-native';
import { useSelector, } from 'react-redux';

const ProductDetailsScreen = ({ navigation, }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state) => state.products.availableProducts.find((prod) => prod.id === productId));

  return (
    <View>
      <Text>{selectedProduct}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ProductDetailsScreen;
