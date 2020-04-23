import { AUTHENTICATE, LOGOUT, } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, { type, token, userId, }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        token,
        userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  };
};