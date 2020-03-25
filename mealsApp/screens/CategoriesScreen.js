import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/colors';
import colors from '../constants/colors';

const CategoriesScreen = ({ navigation, }) => {
  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate({ 
          routeName: 'CategoryMeals', 
          params: {
            categoryId: itemData.item.id,
          }, 
        })}
        style={styles.gridItem}
      >
        <View >
          <Text>
            {itemData.item.title}
          </Text>
        </View>
      </TouchableOpacity> 
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  )
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' || 'web' ? colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' || 'web' ? 'white' : colors.primaryColor,
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,

  },
});

export default CategoriesScreen;