import { LOGIN, SIGN_UP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, { type, token, userId, }) => {
  switch (type) {
    case LOGIN:
      return {
        token,
        userId,
      };
    case SIGN_UP:
      return {
        token,
        userId,
      };
    default:
      return state;
  };
};