import React, { useEffect, } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';

const StartupScreen = ({ navigation, }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigation('Auth');
        return;
      }
      const transformed = JSON.parse(userData);
      const { token, userId, expirationDate } = transformed;
      if (expirationDate <= new Date () || !toke || !userId) {
        navigation.navigation('Auth');
        return;
      }

      navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default StartupScreen;
