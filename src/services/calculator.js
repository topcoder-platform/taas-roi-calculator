import calculatorData from '../assets/data/calculator.json';
import industryIconMap from '../assets/data/lookup/industryIcons.json';

function calculate(formData) {
  const {
    salaries, costOfLivingIncreases, bonusRate, recruimentCosts, overheads, topcoderWeeklyCost,
  } = calculatorData;

  var typeOfTalentsPlurals = formData.talentType;
  if (formData.employeeNumber > 1){
    typeOfTalentsPlurals = formData.talentType + 's';
  }

  const salary = salaries[formData.talentType]; // per-year
  const costOfLivingIncrease = costOfLivingIncreases[formData.costOfLiving];
  const bonus = bonusRate;
  const recruitingCosts = recruimentCosts;

  const annualCostPerEmployee = ((salary + (costOfLivingIncrease * salary)) * bonus) + recruitingCosts + overheads;
  const totalAnnualCost = annualCostPerEmployee;
  const totalWeeklyCost = totalAnnualCost / 52;

  return {
    numberOfEmployee: formData.employeeNumber,
    costOfLiving: formData.costOfLiving,
    industryIcon: industryIconMap[formData.industry],
    averageSalary: salary,
    bonusEquityBenefits: (bonus * salary - salary) * formData.employeeNumber,
    recruiment: recruimentCosts,
    overhead: overheads,
    totalAnnualCost: totalAnnualCost * formData.employeeNumber,
    totalWeeklyCost: totalWeeklyCost * formData.employeeNumber,
    topcoderWeeklyCost,
    youSave: totalWeeklyCost - topcoderWeeklyCost,
    typeOfTalentsPlural: typeOfTalentsPlurals,
  };
}

export default {
  calculate,
};
