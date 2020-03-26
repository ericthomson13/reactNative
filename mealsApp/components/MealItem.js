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
        <ImageBackground source={{ uri: imageUrl, }}>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
              <View style={styles.titleContainer} >
                <Text style={styles.title} numberOfLines={1} >{title}</Text> 
              </View>
          </View>
        </ImageBackground>
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
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    color: 'white',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});
export default MealItem;