import { combineReducers } from 'redux';

import contactReducers from './contact';
import responsiveReducers from './responsive/reducers';

const rootReducer = combineReducers({
  contact: contactReducers,
  responsive: responsiveReducers,
});

export default rootReducer;
