import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Button, 
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number', 
        'Number has to be between 1 and 99', 
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNum(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{selectedNum}</NumberContainer>
        <MainButton onPress={() => props.onStart(selectedNum)}>START GAME</MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
          <TitleText styles={styles.title}>Start a New Game</TitleText>
          <Card style={styles.inputContainer}>
            <BodyText style={styles.text}>Select a Number</BodyText>
              <Input
                style={styles.input} 
                blurOnSubmit
                autoCapitalize='none' 
                // below is getting passed into props as string !Boolean throwing Err
                // autoCorrect={false}
                keyboardType='number-pad' 
                maxLength={2} 
                onChangeText={numberInputHandler}
                value={enteredValue}
              />       
              <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
              </View>
              <View style={styles.button} >
                <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,

  },
  button: {
    width: Dimensions.get('window').width / 4,
    padding: 2,
  },
  input: {
    width: 80,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans',
  }
});

export default StartGameScreen;
