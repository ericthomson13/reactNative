import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const randomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min) + min);
  if (random === exclude) {
    return randomNum(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(randomNum(1, 100, props.userChoice));
  
  const nextGuessHandler = (direction) => {
    if ( 
      (direction === 'lower' && currentGuess < props.userChoice) 
      || (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't lie`, 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
    }
  };

  return (
    <View style={styles.screen}>
      <Text>
        Opponent's Guess
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer} >
          <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
          <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
        </Card>
      </Text>

    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  }
});

export default GameScreen;
