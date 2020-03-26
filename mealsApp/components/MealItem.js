import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';

const MealItem = ({ 
  title,
  onSelectMeal,
  duration,
  complexity,
  affordability,
  imageUrl,
}) => {

  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground source={{ uri: imageUrl, }}>
              <Text>{title}</Text> 
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text>{duration}</Text>
            <Text>{complexity.toUpperCase()}</Text>
            <Text>{affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#ccc',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '90%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
export default MealItem;