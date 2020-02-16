import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };
  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }
  const cancelHandler = () => {
    props.onCancel();
    setEnteredGoal('');
  }

  return (
    <Modal visible={props.visible} animationType="slide" >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Set Goal" 
          style={styles.input} 
          onChangeText={goalInputHandler} 
          value={enteredGoal} 
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button} > 
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
          <View styles={styles.button} >
            <Button title="CANCEL" onPress={cancelHandler}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%', 
    borderColor: 'black', 
    borderWidth: 1, 
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 3,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
    padding: 2,
  }
});

export default GoalInput;
