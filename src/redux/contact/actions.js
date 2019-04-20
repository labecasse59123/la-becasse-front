import request from 'services/http';
import {
  SUBMIT_CONTACT_MESSAGE,
  SUBMIT_CONTACT_MESSAGE_SUCCESS,
  SUBMIT_CONTACT_MESSAGE_FAILURE,
} from './types';

const submitContactMessage = values => (dispatch) => {
  dispatch({ type: SUBMIT_CONTACT_MESSAGE });

  return request.post('/contact')
    .send(values)
    .then(() => dispatch({
      type: SUBMIT_CONTACT_MESSAGE_SUCCESS,
      message: 'Merci pour votre message ! Nous y répondrons au plus vite',
    }))
    .catch(err => dispatch({
      type: SUBMIT_CONTACT_MESSAGE_FAILURE,
      message: 'Une erreur est survenue, merci de réessayer plus tard.',
      err,
    }));
};

export default {
  submitContactMessage,
};
