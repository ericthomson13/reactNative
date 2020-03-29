import React from 'react';
import { View, StyleSheet, } from 'react-native';

import BodyText from './BodyText';

const ListItem = ({ guess, numOfRound }) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>
      # {numOfRound}
    </BodyText>
    <BodyText>
      {guess}
    </BodyText>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  }
});

export default ListItem;