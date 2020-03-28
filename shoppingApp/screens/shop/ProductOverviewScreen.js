import React from 'react';
import { FlatList, } from 'react-native';
import { useSelector, } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = ({ navigation, }) => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList 
      data={products} 
      renderItem={(itemData) =>(
        <ProductItem 
          imageUrl={itemData.item.imageUrl} 
          title={itemData.item.title} 
          price={itemData.item.price}
          onViewDetail={() => {navigation.navigate('ProductDetails')}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductOverviewScreen;
