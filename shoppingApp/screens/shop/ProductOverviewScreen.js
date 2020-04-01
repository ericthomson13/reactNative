import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = ({ navigation, }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetails', { 
      productId: id,
      productTitle: title,
    });
  };

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

export default ProductOverviewScreen;
