import calculatorData from '../assets/data/calculator.json';
import industryIconMap from '../assets/data/lookup/industryIcons.json';

function calculate(formData) {
  const {
    salaries, costOfLivingIncreases, bonusRate, recruimentCosts, overheads, topcoderWeeklyCost,
  } = calculatorData;

  const salary = salaries[formData.talentType]; // per-year
  const costOfLivingIncrease = costOfLivingIncreases[formData.costOfLiving];
  const bonus = bonusRate;
  const recruitingCosts = recruimentCosts;

  const annualCostPerEmployee = ((salary + costOfLivingIncrease) * bonus) + recruitingCosts + overheads;
  const totalAnnualCost = annualCostPerEmployee * formData.employeeNumber;
  const totalWeeklyCost = totalAnnualCost / 52;

  return {
    numberOfEmployee: formData.employeeNumber,
    costOfLiving: formData.costOfLiving,
    industryIcon: industryIconMap[formData.industry],
    averageSalary: salary,
    bonusEquityBenefits: bonus * salary - salary,
    recruiment: recruimentCosts,
    overhead: overheads,
    totalAnnualCost,
    totalWeeklyCost,
    topcoderWeeklyCost,
    youSave: totalWeeklyCost - topcoderWeeklyCost * formData.employeeNumber,
    talentType: formData.talentType,
    industry: formData.industry,
  };
}

export default {
  calculate,
};
