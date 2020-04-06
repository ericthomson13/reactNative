import React, { useEffect, useState, } from 'react';
import { FlatList, Platform, Button, ActivityIndicator, StyleSheet, View, Text, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

import Colors from '../../constants/Colors';

const ProductOverviewScreen = ({ navigation, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(productActions.fetchProducts());
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
    loadProducts();
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetails', { 
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    <View style={styles.centered} >
      <Text>An Error Occurred with Looading Items</Text>
    </View>
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products == 0) {
    <View style={styles.centered}>
      <Text>No Products Found Please Add Some</Text>
    </View>
  }

  return (
    <FlatList 
      data={products} 
      renderItem={(itemData) =>(
        <ProductItem 
          imageUrl={itemData.item.imageUrl} 
          title={itemData.item.title} 
          price={itemData.item.price}
          onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
        >
          <Button title="VIEW DETAILS" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} color={Colors.primary}/>
          <Button 
            title="ADD TO CART" 
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }} 
            color={Colors.primary}/>
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navData) => ({
  headerTitle: 'All Products',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title='Cart' 
        iconName={Platform.OS !== 'ios' ?  'ios-cart' : 'md-cart' }
        onPress={()=> {navData.navigation.navigate('Cart')}}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title='Menu' 
        iconName={Platform.OS !== 'ios' ?  'ios-menu' : 'md-menu'}
        onPress={()=> {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductOverviewScreen;
