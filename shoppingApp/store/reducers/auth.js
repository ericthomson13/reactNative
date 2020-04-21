import { AUTHENTICATE, } from "../actions/auth";

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
    default:
      return state;
  };
};