import React from 'react';
import { FlatList, Platform, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

import * as cartActions from '../../store/actions/cart';

const ProductOverviewScreen = ({ navigation, }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList 
      data={products} 
      renderItem={(itemData) =>(
        <ProductItem 
          imageUrl={itemData.item.imageUrl} 
          title={itemData.item.title} 
          price={itemData.item.price}
          onViewDetail={() => {
            navigation.navigate('ProductDetails', { 
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
  headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item 
      title='Cart' 
      iconName={Platform.OS !== 'ios' ?  'md-cart' : 'ios-cart'}
      onPress={()=> {}}
    />
  </HeaderButtons>,
};

export default ProductOverviewScreen;
