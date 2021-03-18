import { createActions } from 'redux-actions';
import calculatorService from '../services/calculator';
import * as urlUtil from '../utils/url';

function initApp() {
  if (window.location.pathname.startsWith('/result')) {
    const params = urlUtil.getParamsfromQueryString(window.location.search);
    const form = urlUtil.createCalculationFormFromParams(params);
    const result = calculatorService.calculate(form);

    return {
      calculationForm: form,
      calculationResult: result,
    };
  }

  return undefined;
}

export default createActions({
  INIT_APP: initApp,
});
