import React, { useEffect, useState } from 'react';
import PT from 'prop-types';
import { PrimaryButton } from 'topcoder-react-ui-kit';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import Dropdown from '../Dropdown';
import RadioButtons from '../RadioButton';
import TextInput from '../TextInput';
import * as utils from '../../utils';
import * as constants from '../../constants';

import './styles.scss';

const CalculatorForm = ({
  data,
  talentTypes,
  employeeNumbers,
  industries,
  companySizes,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ ...data, prestine: true });
  const [talentTypeOptions, setTalentTypeOptions] = useState(utils.createDropdownOptions(talentTypes, formData.talentType));
  const [employeeNumberOptions, setEmployeeNumberOptions] = useState(utils.createDropdownOptions(employeeNumbers, formData.employeeNumber));
  const [industriesOptions, setIndustriesOptions] = useState(utils.createDropdownOptions(industries, formData.industry));
  const [companySizesOptions, setCompanySizesOptions] = useState(utils.createDropdownOptions(companySizes, formData.companySize));
  const [costOfLivings, setCostOfLivings] = useState(utils.createRadioOptions(constants.COST_OF_LIVINGS, formData.costOfLiving));
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    setTalentTypeOptions(utils.createDropdownOptions(talentTypes, formData.talentType));
    setEmployeeNumberOptions(utils.createDropdownOptions(employeeNumbers, formData.employeeNumber));
    setIndustriesOptions(utils.createDropdownOptions(industries, formData.industry));
    setCompanySizesOptions(utils.createDropdownOptions(companySizes, formData.companySize));
  }, [talentTypes, employeeNumbers, industries, companySizes]);

  const validateAndSubmit = (submit) => {
    const newValidation = {
      talentTypeError: !formData.talentType ? 'Talent type is required' : null,
      employeeNumberError: !formData.employeeNumber ? 'Number of people is required' : null,
      industryError: !formData.industry ? 'Industry is required' : null,
      companySizeError: !formData.companySize ? 'Company size is required' : null,
      costOfLivingError: !formData.costOfLiving ? 'Cost of Living is required' : null,
      firstNameError: !formData.firstName ? 'First name is required' : null,
      lastNameError: !formData.lastName ? 'Last name is required' : null,
      companyError: !formData.company ? 'Company is required' : null,
      emailError: !formData.email ? 'Work email is required' : null,
    };

    setValidation(newValidation);

    if (submit) {
      setFormData({ ...formData, prestine: false });

      const valid = _.every(newValidation, (val) => val === null);
      if (valid) setTimeout(() => onSubmit(formData), process.env.GUIKIT.DEBOUNCE_ON_CHANGE_TIME);
    }
  };

  useEffect(() => {
    if (!formData.prestine) {
      validateAndSubmit(false);
    }
  }, [formData]);

  const isMobileOrTablet = useMediaQuery({ query: `(max-width: ${process.env.SCREEN.MD}px)` });

  return (
    <form styleName="calculator-form" noValidate autoComplete="off">
      <div>
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Type of talent required"
          options={talentTypeOptions}
          onChange={(options) => {
            setTalentTypeOptions(options);
            setFormData({ ...formData, talentType: utils.getSelectedDropdownOption(options).label });
          }}
          errorMsg={validation && validation.talentTypeError}
        />
      </div>
      <div>
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Number of people required"
          options={employeeNumberOptions}
          onChange={(options) => {
            setEmployeeNumberOptions(options);
            setFormData({ ...formData, employeeNumber: +utils.getSelectedDropdownOption(options).label });
          }}
          errorMsg={validation && validation.employeeNumberError}
        />
      </div>
      <div>
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Industry"
          options={industriesOptions}
          onChange={(options) => {
            setIndustriesOptions(options);
            setFormData({ ...formData, industry: utils.getSelectedDropdownOption(options).label });
          }}
          errorMsg={validation && validation.employeeNumberError}
        />
      </div>
      <div>
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Company size"
          options={companySizesOptions}
          onChange={(options) => {
            setCompanySizesOptions(options);
            setFormData({ ...formData, companySize: utils.getSelectedDropdownOption(options).label });
          }}
          errorMsg={validation && validation.companySizeError}
        />
      </div>
      <div styleName="radio-group">
        <span styleName="label">Cost of Living</span>
        {' '}
        <i />
        <RadioButtons
          size={isMobileOrTablet ? 'sm' : 'lg'}
          options={costOfLivings}
          onChange={(options) => {
            setCostOfLivings(options);
            setFormData({ ...formData, costOfLiving: utils.getSelectedRadioOption(options).label });
          }}
          errorMsg={validation && validation.costOfLivingError}
        />
      </div>
      <hr styleName="horizontal-rule" />
      <div>
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="First name"
          onChange={(value) => {
            setFormData({ ...formData, firstName: value });
          }}
          errorMsg={validation && validation.firstNameError}
          value={formData.firstName}
        />
      </div>
      <div>
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Last name"
          onChange={(value) => {
            setFormData({ ...formData, lastName: value });
          }}
          errorMsg={validation && validation.lastNameError}
          value={formData.lastName}
        />
      </div>
      <div>
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Company"
          onChange={(value) => {
            setFormData({ ...formData, company: value });
          }}
          errorMsg={validation && validation.companyError}
          value={formData.company}
        />
      </div>
      <div>
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Work email"
          onChange={(value) => {
            setFormData({ ...formData, email: value });
          }}
          errorMsg={validation && validation.emailError}
          value={formData.email}
        />
      </div>
      <div styleName="footer">
        <PrimaryButton onClick={() => { validateAndSubmit(true); }}>SEE YOUR RESULTS</PrimaryButton>
      </div>
    </form>
  );
};

CalculatorForm.propTypes = {
  data: PT.shape({
    talentType: PT.string,
    employeeNumber: PT.number,
    industry: PT.string,
    companySize: PT.string,
    livingCost: PT.string,
    firstName: PT.string,
    lastName: PT.string,
    company: PT.string,
    email: PT.string,
  }).isRequired,
  talentTypes: PT.arrayOf(PT.string).isRequired,
  employeeNumbers: PT.arrayOf(PT.number).isRequired,
  industries: PT.arrayOf(PT.string).isRequired,
  companySizes: PT.arrayOf(PT.string).isRequired,
  onSubmit: PT.func.isRequired,
};

export default CalculatorForm;
