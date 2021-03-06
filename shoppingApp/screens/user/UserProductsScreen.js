import React from 'react';
import { FlatList, Platform, Button, Alert, View, Text, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = ({ navigation, }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert('Are you sure you want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(productsActions.deleteProduct(id))
      },
    ])
  };

  const editProductHandler = (id) => {
    navigation.navigate('EditProducts', {
      productId: id,
    });
  };

  if (!userProducts.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Products Found</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => {editProductHandler(itemData.item.id)}}
        >
          <Button
            title="EDIT"
            onPress={() => editProductHandler(itemData.item.id)}
            color={Colors.primary}
          />
          <Button
            title="DELETE"
            onPress={() => deleteHandler(itemData.item.id)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) =>  ({
  headerTitle: 'Your Products',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Menu'
        iconName={Platform.OS !== 'ios' ?  'ios-menu' : 'md-menu'}
        onPress={()=> {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Add'
        iconName={Platform.OS !== 'ios' ?  'ios-create' : 'md-create'}
        onPress={()=> {navData.navigation.navigate('EditProducts')}}
      />
    </HeaderButtons>
  ),
});

export default UserProductsScreen;
