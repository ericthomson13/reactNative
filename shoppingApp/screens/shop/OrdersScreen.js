import React, { useEffect, useState, useCallback, } from 'react';
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';

import * as orderActions from '../../store/actions/order';
import Colors from '../../constants/Colors';

const OrdersScreen = ({ navigation, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadOrders);
    return () => {
      willFocusSub.remove();
    }
  }, [loadOrders]);

  useEffect(() => {
    async () => {
      setIsLoading(true);
      await loadOrders();
      setIsLoading(false);
    }
  }, [dispatch]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error Occurred</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Orders Found</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
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
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
