import React, { useReducer, useCallback, useState, } from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const formReducer = (state, action) => {
  if (action.type === 'FORM_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    }
    const updatedValidities = {
      ...state.inputValidity,
      [action.input]: action.isValid,
    }
    let formIsValid = true;
    for (let key in updatedValidities) {
      if (!updatedValidities[key]) {
        formIsValid = false;
      }
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidity: updatedValidities,
      formIsValid,
    }
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidity: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = () => {
    let action;
    if (isSignup) {
      action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password);
    }
    dispatch(action);
  };

  const inputChangeHandler = useCallback((identifier, value, isValid) => {
    dispatchFormState({ type: 'FORM_UPDATE', value, isValid, input: identifier });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              required
              email
              autoCapitalize="none"
              errorText="Please Enter a valid Email Address"
              onInputChange={inputChangeHandler}
              initialValue=""
              keyboardType="email-address"
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              password
              minLength={5}
              autoCapitalize="none"
              errorText="Please Enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title={isSignup ? 'Sign UP' : 'Login'} color={Colors.primary} onPress={authHandler}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.primary}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>

  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Please Login'
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 2,
  }
});

export default AuthScreen;
