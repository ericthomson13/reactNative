import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, } from 'react-native';

const CategoryGridTile = (itemData) => {
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

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoryGridTile;
