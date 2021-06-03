/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PT from 'prop-types';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CalculatorForm from '../../components/CalculatorForm';
import actions from '../../actions';
import * as utils from '../../utils';
import { addRow } from '../../services/googlesheets';
import hello from 'assets/images/hello.png';

import './styles.scss';

const Landing = ({
  calculationForm,
  talentTypes,
  employeeNumbers,
  industries,
  companySizes,
  getTalentTypes,
  getEmployeeNumbers,
  getIndustries,
  getCompanySizes,
  calculateROI,
}) => {
  useEffect(() => {
    getTalentTypes();
    getEmployeeNumbers();
    getIndustries();
    getCompanySizes();
  }, []);

  const history = useHistory();
  const navigateTo = (path) => {
    history.push(path);
  };

  const isMobileOrTablet = useMediaQuery({ query: `(max-width: ${process.env.SCREEN.MD}px)` });

  return (
    <div styleName="page" id="landing">
      <div styleName="row">
        <div styleName="col">
          <Sticky top={160} enabled={!isMobileOrTablet} bottomBoundary={805}>
            <div styleName="left-section">
              <h3 styleName="heading-3 text-gradient" className="upper-case">Hello. Welcome to the Talent as a Service ROI calculator</h3>
              <p styleName="text">With this handy tool you can easily compare hiring a direct FTE vs using our innovative staffing solution. Simply input some details to see your customized report and how to rapidly increase your team’s output and productivity.</p>
              <img src={hello} width={['100%','auto']}  alt="hello" />
            </div>
          </Sticky>
        </div>
        <div styleName="col">
          <CalculatorForm
            data={calculationForm}
            talentTypes={talentTypes}
            employeeNumbers={employeeNumbers}
            industries={industries}
            companySizes={companySizes}
            onSubmit={(formData) => {
              const calculateRes = calculateROI(formData);
              const { form, result } = calculateRes.payload;
              addRow({
                type_of_talent: result.typeOfTalentsPlural,
                number_of_people_required: form.employeeNumber,
                industry: form.industry,
                company_size: form.companySize,
                cost_of_living: form.costOfLiving,
                first_name: form.firstName,
                last_name: form.lastName,
                company: form.company,
                work_email: form.email,
                average_salary: result.averageSalary,
                bonuses_and_benefits: result.bonusEquityBenefits,
                recruitment_and_overhead: result.overhead,
                total_annually: result.totalAnnualCost,
                weekly_cost: result.totalWeeklyCost,
                topcoder_weekly_cost: result.topcoderWeeklyCost,
                you_save: result.youSave,
              });
              navigateTo(`/result?${utils.url.createUrlQueryString(formData)}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  calculationForm: PT.shape({
    talentType: PT.string,
    employeeNumber: PT.string,
    industry: PT.string,
    companySize: PT.string,
    livingCost: PT.string,
    firstName: PT.string,
    lastName: PT.string,
    company: PT.string,
    email: PT.string,
  }).isRequired,
  talentTypes: PT.arrayOf(PT.string).isRequired,
  employeeNumbers: PT.arrayOf(PT.string).isRequired,
  industries: PT.arrayOf(PT.string).isRequired,
  companySizes: PT.arrayOf(PT.string).isRequired,
  getTalentTypes: PT.func.isRequired,
  getEmployeeNumbers: PT.func.isRequired,
  getIndustries: PT.func.isRequired,
  getCompanySizes: PT.func.isRequired,
  calculateROI: PT.func.isRequired,
};

const mapStateToProps = (state) => ({
  calculationForm: state.calculation.form,
  talentTypes: state.lookup.talentTypes,
  employeeNumbers: state.lookup.employeeNumbers,
  industries: state.lookup.industries,
  companySizes: state.lookup.companySizes,
});

const mapDispatchToProps = {
  getTalentTypes: actions.lookup.getTalentTypes,
  getEmployeeNumbers: actions.lookup.getEmployeeNumbers,
  getIndustries: actions.lookup.getIndustries,
  getCompanySizes: actions.lookup.getCompanySizes,
  calculateROI: actions.calculation.calculateRoi,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);
