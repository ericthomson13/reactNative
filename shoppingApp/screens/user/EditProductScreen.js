import React, { useEffect, useCallback, useReducer, } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert, } from 'react-native';
import { HeaderButtons, Item, } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, } from 'react-redux';

import Input from '../../components/UI/Input';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productActions from '../../store/actions/products';

// TODO: Add Validate.js use for validation

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

const EditProductScreen = ({ navigation, }) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

  const [formState, dispatchFormState] = useReducer(formReducer, { 
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    }, 
    inputValidity: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    }, 
    formIsValid: editedProduct ? true : false, 
  });

  const dispatch = useDispatch();


  const submitHandler = useCallback(() => {
    if(!formState.formIsValid) {
      Alert.alert('Invalid Input', 'Please update before submitting', [{ text: 'Ok' }]);
      return;
    };
    if (editedProduct) {
      dispatch(productActions.updateProduct(
        prodId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl
      ));
    } else {
      dispatch(productActions.createProduct(
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        +formState.inputValues.price
      ));
    }
    navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler});
  }, [submitHandler]);

  const inputChangeHandler = useCallback((identifier, value, isValid) => {
    dispatchFormState({ type: 'FORM_UPDATE', value, isValid, input: identifier });
  }, [dispatchFormState]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input 
          id='title'
          autoCapitalize='words'
          autoCorrect
          returnKeyType='next'
          label='title'
          errorText='Please enter a valid title'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id='imageUrl'
          returnKeyType='next'
          label='Image Url'
          errorText='Please enter a valid Image Url'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          initiallyValid={!!editedProduct}
          required
        />

        {editedProduct ? null : (
          <Input
            id='title'
            label='Price'
            errorText='Please enter a valid Price'
            keyboardType='decimal-pad'
            returnType='next'
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )
        }
        <Input 
          id='description'
          autoCapitalize='words'
          autoCorrect
          label='description'
          errorText='Please enter a valid description'
          multiline
          autoCapitalize='sentences'
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  )
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
          title='Add' 
          iconName={Platform.OS !== 'ios' ?  'ios-checkmark' : 'md-checkmark'}
          onPress={()=> {submitFn}}
        />
      </HeaderButtons>
    ),
  }
 };

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
