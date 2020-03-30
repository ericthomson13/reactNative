import React from 'react';
import { FlatList, Platform, } from 'react-native';
import { useSelector, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList 
      data={orders} 
      renderItem={(itemData) => {
        return <Text>{itemData.item.totalAmount}</Text>
      }}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => ({
  headerTitle: 'Your Order',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title='Menu' 
        iconName={Platform.OS !== 'ios' ?  'ios-menu' : 'md-menu'}
        onPress={()=> {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  )
})
export default OrdersScreen