import React from 'react';
import { View, Switch, Text, Platform, StyleSheet, } from 'react-native';
import colors from '../constants/colors';

const FilterSwitch = ({ label, value, onValueChange, }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch 
        value={value} 
        onValueChange={(newValue) => onValueChange(newValue)} 
        trackColor={{ true: colors.primaryColor }}
        thumbColor={Platform.OS !== 'ios' ? colors.primaryColor : ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
});

export default FilterSwitch;