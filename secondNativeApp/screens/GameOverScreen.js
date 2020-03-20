import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/success.png')} 
          style={styles.image}
          resizeMethod="scale"
        />
      </View>
      <BodyText>Number of rounds: {roundsNumber}</BodyText>
      <BodyText>Number was: {userNumber}</BodyText>
      <Button title="NEW GAME" onPress={onRestart}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    width: '80%',
    height: '80%',
    overflow: 'hidden',
    marginVertical: 30, 
  },
});

export default GameOverScreen;
