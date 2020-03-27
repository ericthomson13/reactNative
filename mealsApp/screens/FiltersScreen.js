import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const FiltersScreen = ({ navigation, }) => {

  return (
    <View style={styles.screen} >
      <Text>
        Filters Screen
      </Text>
    </View>
  )
};

FiltersScreen.navigationOptions = (navData) => ({
  headerTitle: 'Filters',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item 
        title="menu"
        iconName="ios-menu"
        onPress={() => {navData.navigation.toggleDrawer()}}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default FiltersScreen;