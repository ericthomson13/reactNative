import { firebaseKey, } from '../../secrets';
import { AsyncStorage, } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId,
    token,
  }
};

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
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = 'Something Went Wrong';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This User Already Exists';
      }

      throw new Error (message);
    };
    const resData = await res.json();
    dispatch(authenticate(resData.idToken, resData.localId));
    const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = 'Something Went Wrong';

      if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
        message = 'Invalid email or password';
      }

      throw new Error (message);
    };

    const resData = await res.json();

    dispatch(authenticate(resData.idToken, resData.localId));
    const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');

  return {
    type: LOGOUT,
  }
};

// allows for auto logout when time expires
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer);
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expirationDate: expirationDate.toISOString(),
  }));
};
