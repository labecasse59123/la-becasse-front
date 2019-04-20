import { combineReducers } from 'redux';

import contactReducers from './contact';
import responsiveReducers from './responsive/reducers';
import facebookReducers from './facebook';

const rootReducer = combineReducers({
  contact: contactReducers,
  responsive: responsiveReducers,
  facebook: facebookReducers,
});

export default rootReducer;
