import { handleActions } from 'redux-actions';

const defaultState = {
  talents: [],
};

function getTalentsInit(state) {
  return { ...state };
}

function getTalentsDone(state, { payload }) {
  return { ...state, talents: payload };
}

export default handleActions({
  GET_TALENTS_INIT: getTalentsInit,
  GET_TALENTS_DONE: getTalentsDone,
}, defaultState);
