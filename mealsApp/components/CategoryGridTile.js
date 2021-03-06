import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';


const CategoryGridTile = ({ title, onSelect, color, }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21 ) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp 
        onPress={onSelect}
        style={{ flex: 1 }}
      >
        <View style={{ ...styles.container , backgroundColor: color }}>
          <Text style={styles.title} numberOfLines={2} >
            {title}
          </Text>
        </View>
      </TouchableCmp> 
    </View>
    
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    elevation: 5,
    overflow: (Platform.OS === 'android' && Platform.Version >= 21) || Platform.OS === 'web' ? 'hidden' : 'visible',
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
    padding: 10,
  }
});

export default CategoryGridTile;
