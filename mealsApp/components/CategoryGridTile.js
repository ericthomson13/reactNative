import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, } from 'react-native';

const CategoryGridTile = ({ title, onSelect, }) => {
  return (
    <TouchableOpacity 
      onPress={onSelect}
      style={styles.gridItem}
    >
      <View >
        <Text>
          {title}
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
