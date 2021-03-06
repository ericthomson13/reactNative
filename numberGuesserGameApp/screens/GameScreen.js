import React, { useState, useRef, useEffect, } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import ListItem from '../components/ListItem';

import DefaultStyles from '../constants/default-styles';

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

const GameScreen = ({ userChoice, onGameOver, }) => {
  const initialGuess = randomNum(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

 
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver ]);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
      setDeviceWidth(Dimensions.get('window').width);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  const nextGuessHandler = (direction) => {
    if ( 
      (direction === 'lower' && currentGuess < userChoice) 
      || (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert(`Don't lie`, 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = randomNum(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNum);
    setPastGuesses(curPastGuesses => [nextNum, ...curPastGuesses]);
  };

  if (deviceHeight< 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>
          Opponent's Guess
        </Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, i) => (
              <ListItem guess={guess} numOfRound={pastGuesses.length - i}/>
            ))}
          </ScrollView>
        </View>
        
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>
        Opponent's Guess
      </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer} >
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => (
            <ListItem guess={guess} numOfRound={pastGuesses.length - i}/>
          ))}
        </ScrollView>
      </View>
      
    </View>
  );
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  }
});

export default GameScreen;
