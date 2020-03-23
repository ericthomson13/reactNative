import React from 'react';
import { View, StyleSheet, Platform, } from 'react-native';

import TitleText from './TitleText';

import Colors from '../constants/colors';

const Header = (props) => (
  <View 
    style={{ 
      ...styles.headerBase, 
      ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid })
    }}>
    <TitleText styles={styles.title}>{props.title}</TitleText>
  </View>
);

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  headerAndroid: {
    borderBackground: Colors.primary,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

export default Header;
