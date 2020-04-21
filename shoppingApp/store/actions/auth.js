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
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = 'Something Went Wrong';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This User Already Exists';
      }

      throw new Error (message);
    };
    const resData = await res.json();
    console.log(resData);
    dispatch({ type: SIGN_UP, token: resData.idToken, userId: resData.localId });
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

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId, });
  };
};
