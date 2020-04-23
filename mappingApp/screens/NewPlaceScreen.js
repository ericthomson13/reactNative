import React, { useState, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch, } from 'react-redux';

import * as placesActions from '../store/places-actions';

import Colors from '../constants/Colors';

const NewPlaceScreen = ({ navigation, }) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title));
    navigation.goBack();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label} >Title</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setTitle}
      />
      <Button
        title='save place'
        color={Colors.primary}
        onPress={savePlaceHandler}
      />
    </View>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add a New Place',
};

const style = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
