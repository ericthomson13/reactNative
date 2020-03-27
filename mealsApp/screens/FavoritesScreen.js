import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

const FavoritesScreen = ({ navigation, }) => {

  return (
    <View style={styles.screen} >
      <Text>
        Favorites Screen
      </Text>
    </View>
  )
};

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default FavoritesScreen;