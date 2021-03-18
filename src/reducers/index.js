import { combineReducers } from 'redux';
import calculation from './calculation';
import lookup from './lookup';
import talent from './talent';

export default combineReducers({
  calculation,
  lookup,
  talent,
});
