import {
  SUBMIT_CONTACT_MESSAGE,
  SUBMIT_CONTACT_MESSAGE_SUCCESS,
  SUBMIT_CONTACT_MESSAGE_FAILURE,
} from './types';

const INITIAL_STATE = {
  message: '',
};

const contactReducer = (state = INITIAL_STATE, { type, message, err }) => {
  switch (type) {
    case SUBMIT_CONTACT_MESSAGE_SUCCESS:
      return {
        message,
      };
    case SUBMIT_CONTACT_MESSAGE_FAILURE:
      return {
        message,
        err,
      };
    case SUBMIT_CONTACT_MESSAGE:
    default:
      return state;
  }
};

export default contactReducer;
