import talentData from '../assets/data/lookup/talent-types.json';
import employeeNumberData from '../assets/data/lookup/employee-numbers.json';
import industryData from '../assets/data/lookup/industries.json';
import companySizeData from '../assets/data/lookup/company-sizes.json';

function getTalentTypes() {
  return talentData;
}

function getEmployeeNumbers() {
  return employeeNumberData;
}

function getIndustries() {
  return industryData;
}

function getCompanySizes() {
  return companySizeData;
}

export default {
  getTalentTypes,
  getEmployeeNumbers,
  getIndustries,
  getCompanySizes,
};
