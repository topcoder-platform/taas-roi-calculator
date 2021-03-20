import { handleActions } from 'redux-actions';

const defaultState = {
  form: {
    talentType: null,
    employeeNumber: null,
    industry: null,
    companySize: null,
    costOfLiving: null,
    firstName: '',
    lastName: '',
    company: '',
    email: '',
  },
  result: {
    numberOfEmployee: null,
    costOfLiving: null,
    technologyServiceIcon: null,
    averageSalary: null,
    bonusEquityBenefits: null,
    recruiment: null,
    overhead: null,
    totalAnnualCost: null,
    totalWeeklyCost: null,
    topcoderWeeklyCost: null,
    youSave: null,
  },
};

function initApp(state, { payload }) {
  if (payload && payload.calculationForm && payload.calculationResult) {
    return { ...state, form: payload.calculationForm, result: payload.calculationResult };
  }

  return { ...state };
}

function calculateROI(state, { payload }) {
  return { ...state, form: payload.form, result: payload.result };
}

export default handleActions({
  INIT_APP: initApp,
  CALCULATE_ROI: calculateROI,
}, defaultState);
