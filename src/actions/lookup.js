import { createActions } from 'redux-actions';
import service from '../services/lookup';

function getTalentTypes() {
  return service.getTalentTypes();
}

function getEmployeeNumbers() {
  return service.getEmployeeNumbers();
}

function getIndustries() {
  return service.getIndustries();
}

function getCompanySizes() {
  return service.getCompanySizes();
}

export default createActions({
  GET_TALENT_TYPES: getTalentTypes,
  GET_EMPLOYEE_NUMBERS: getEmployeeNumbers,
  GET_INDUSTRIES: getIndustries,
  GET_COMPANY_SIZES: getCompanySizes,
});
