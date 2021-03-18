import { createActions } from 'redux-actions';
import service from '../services/calculator';

function calculateROI(formData) {
  return {
    form: formData,
    result: service.calculate(formData),
  };
}

export default createActions({
  CALCULATE_ROI: calculateROI,
});
