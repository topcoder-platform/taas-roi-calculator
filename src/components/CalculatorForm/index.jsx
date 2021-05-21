import React, { useEffect, useState } from 'react';
import PT from 'prop-types';
import { PrimaryButton } from 'topcoder-react-ui-kit';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import Tippy from '@tippyjs/react';
import Dropdown from '../Dropdown';
import RadioButtons from '../RadioButton';
import TextInput from '../TextInput';
import * as utils from '../../utils';
import * as constants from '../../constants';
import IconHelp from '../../assets/icons/help.svg';

import './styles.scss';

const CalculatorForm = ({
  data,
  talentTypes,
  employeeNumbers,
  industries,
  companySizes,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ ...data, pristine: true, validation: null });
  const [talentTypeOptions, setTalentTypeOptions] = useState(utils.createDropdownOptions(talentTypes, formData.talentType));
  const [employeeNumberOptions, setEmployeeNumberOptions] = useState(utils.createDropdownOptions(employeeNumbers, formData.employeeNumber));
  const [industriesOptions, setIndustriesOptions] = useState(utils.createDropdownOptions(industries, formData.industry));
  const [companySizesOptions, setCompanySizesOptions] = useState(utils.createDropdownOptions(companySizes, formData.companySize));
  const [costOfLivings, setCostOfLivings] = useState(utils.createRadioOptions(constants.COST_OF_LIVINGS, formData.costOfLiving));
  const { validation } = formData;

  useEffect(() => {
    setTalentTypeOptions(utils.createDropdownOptions(talentTypes, formData.talentType));
    setEmployeeNumberOptions(utils.createDropdownOptions(employeeNumbers, formData.employeeNumber));
    setIndustriesOptions(utils.createDropdownOptions(industries, formData.industry));
    setCompanySizesOptions(utils.createDropdownOptions(companySizes, formData.companySize));
  }, [talentTypes, employeeNumbers, industries, companySizes]);

  const validateWorkEmail = (email) => {
    if (!email) {
      return 'Work email is required';
    } if (!utils.isValidEmail(email)) {
      return 'Invalid work email';
    }

    return null;
  };

  const validateForm = (form) => {
    if (form.pristine) {
      return null;
    }

    return {
      talentTypeError: !form.talentType ? 'Talent type is required' : null,
      employeeNumberError: !form.employeeNumber ? 'Number of people is required' : null,
      industryError: !form.industry ? 'Industry is required' : null,
      companySizeError: !form.companySize ? 'Company size is required' : null,
      costOfLivingError: !form.costOfLiving ? 'Cost of Living is required' : null,
      firstNameError: !form.firstName ? 'First name is required' : null,
      lastNameError: !form.lastName ? 'Last name is required' : null,
      companyError: !form.company ? 'Company is required' : null,
      emailError: validateWorkEmail(form.email),
    };
  };

  const isMobileOrTablet = useMediaQuery({ query: `(max-width: ${process.env.SCREEN.MD}px)` });

  return (
    <form styleName="calculator-form" noValidate autoComplete="off">
      <div styleName="dropdown">
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Type of talent required"
          options={talentTypeOptions}
          onChange={(options) => {
            const newFormData = {
              ...formData,
              talentType: utils.getSelectedDropdownOption(options).label,
            };
            setTalentTypeOptions(options);
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.talentTypeError}
        />
      </div>
      <div styleName="dropdown">
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Number of people required"
          options={employeeNumberOptions}
          onChange={(options) => {
            const newFormData = {
              ...formData,
              employeeNumber: utils.getSelectedDropdownOption(options).label,
            };
            setEmployeeNumberOptions(options);
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.employeeNumberError}
        />
      </div>
      <div styleName="dropdown">
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Industry"
          options={industriesOptions}
          onChange={(options) => {
            const newFormData = {
              ...formData,
              industry: utils.getSelectedDropdownOption(options).label,
            };
            setIndustriesOptions(options);
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.industryError}
        />
      </div>
      <div styleName="dropdown">
        <Dropdown
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Company size"
          options={companySizesOptions}
          onChange={(options) => {
            const newFormData = {
              ...formData,
              companySize: utils.getSelectedDropdownOption(options).label,
            };
            setCompanySizesOptions(options);
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.companySizeError}
        />
      </div>
      <div styleName="radio-group">
        <span styleName="label">
          Cost of Living
          {' '}
          <Tippy content="Cost of Living Increases" touch><span><IconHelp styleName="help-icon" /></span></Tippy>
        </span>
        <RadioButtons
          size={isMobileOrTablet ? 'sm' : 'lg'}
          options={costOfLivings}
          onChange={(options) => {
            const newFormData = {
              ...formData,
              costOfLiving: utils.getSelectedRadioOption(options).label,
            };
            setCostOfLivings(options);
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.costOfLivingError}
        />
      </div>
      <hr styleName="horizontal-rule" />
      <div styleName="input">
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="First name"
          onChange={(value) => {
            const newFormData = {
              ...formData,
              firstName: value,
            };
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.firstNameError}
          value={formData.firstName}
        />
      </div>
      <div styleName="input">
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Last name"
          onChange={(value) => {
            const newFormData = {
              ...formData,
              lastName: value,
            };
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.lastNameError}
          value={formData.lastName}
        />
      </div>
      <div styleName="input">
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Company"
          onChange={(value) => {
            const newFormData = {
              ...formData,
              company: value,
            };
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.companyError}
          value={formData.company}
        />
      </div>
      <div styleName="input">
        <TextInput
          size={isMobileOrTablet ? 'sm' : 'lg'}
          placeholder="Work email"
          onChange={(value) => {
            const newFormData = {
              ...formData,
              email: value,
            };
            setFormData({ ...newFormData, validation: validateForm(newFormData) });
          }}
          errorMsg={validation && validation.emailError}
          value={formData.email}
        />
      </div>
      <div styleName="footer">
        <PrimaryButton
          onClick={() => {
            const newFormData = { ...formData, pristine: false };
            newFormData.validation = validateForm(newFormData);
            setFormData(newFormData);
            const valid = newFormData.validation && _.every(newFormData.validation, (val) => val === null);
            if (valid) setTimeout(() => onSubmit(formData), process.env.GUIKIT.DEBOUNCE_ON_CHANGE_TIME);
          }}
          size={isMobileOrTablet ? 'sm' : ''}
        >
          SEE YOUR RESULTS
        </PrimaryButton>
      </div>
    </form>
  );
};

CalculatorForm.propTypes = {
  data: PT.shape({
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
  onSubmit: PT.func.isRequired,
};

export default CalculatorForm;
