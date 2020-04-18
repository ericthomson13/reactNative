import { firebaseKey, } from '../../secrets';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

export const signUp = (email, password) => {
  return async (dispatch) => {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    if (!res.ok) {
      throw new Error('Something Went Wrong');
    };
    const resData = await res.json();
    console.log(resData);
    dispatch({ type: SIGN_UP, })
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    });

    if (!res.ok) {
      throw new Error('Failure to Login');
    }

    const resData = await res.json();

    dispatch({ type: LOGIN, });
  };
};
