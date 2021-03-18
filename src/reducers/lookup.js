import { handleActions } from 'redux-actions';

const defaultState = {
  talentTypes: [],
  employeeNumbers: [],
  industries: [],
  companySizes: [],
};

function getTalentTypes(state, { payload }) {
  return { ...state, talentTypes: payload };
}

function getEmployeeNumbers(state, { payload }) {
  return { ...state, employeeNumbers: payload };
}

function getIndustries(state, { payload }) {
  return { ...state, industries: payload };
}

function getCompanySizes(state, { payload }) {
  return { ...state, companySizes: payload };
}

export default handleActions({
  GET_TALENT_TYPES: getTalentTypes,
  GET_EMPLOYEE_NUMBERS: getEmployeeNumbers,
  GET_INDUSTRIES: getIndustries,
  GET_COMPANY_SIZES: getCompanySizes,
}, defaultState);
