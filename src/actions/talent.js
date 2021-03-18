import { createActions } from 'redux-actions';
import service from '../services/talent';

function getTalents() {
  return service.getTalents();
}

export default createActions({
  GET_TALENTS: getTalents,
});
