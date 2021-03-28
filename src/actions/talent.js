import { createActions } from 'redux-actions';
import service from '../services/talent';

function getTalents(members) {
  return service.getTalents(members);
}

export default createActions({
  GET_TALENTS: getTalents,
});
