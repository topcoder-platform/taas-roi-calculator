export * as rate from './rate';
export * as url from './url';
export * as platform from './platform';

export function createDropdownOptions(values, selectedValue) {
  return values.map((value) => ({ label: `${value}`, selected: selectedValue === value }));
}

export function getSelectedDropdownOption(options) {
  return options.find((o) => o.selected);
}

export function createRadioOptions(values, selectedValue) {
  return values.map((value) => ({ label: `${value}`, value: selectedValue === value }));
}

export function getSelectedRadioOption(options) {
  return options.find((o) => o.value);
}

/**
 * Format number value into the money text of number by thousand units.
 * Ex: 154123 -> $154.1K
 */
export function formatMoneyValueK(value) {
  let val = value || 0;

  val /= 1000;
  val = val.toLocaleString('en-US');

  const i = val.indexOf('.');
  if (i !== -1) {
    val = `${val.slice(0, i)}.${val.slice(i + 1, i + 2)}`;
  }

  if (val.startsWith('-')) {
    val = `-${val.slice(1)}K`;
  } else {
    val = `$${val}K`;
  }

  return val;
}

/**
 * Format number value into money integer text.
 * Ex: 2500 -> $2,500
 */
export function formatMoneyValueI(value) {
  let val = value || 0;
  val = val.toLocaleString('en-US');

  const i = val.indexOf('.');
  if (i !== -1) {
    val = val.slice(0, i);
  }

  if (val.startsWith('-')) {
    val = `-$${val.slice(1)}`;
  } else {
    val = `$${val}`;
  }

  return val;
}

/**
 * Return a number text with leading zeros.
 * Ex: 3 -> '03'
 */
export function format2DigitsNumber(num) {
  let n = num;
  n = n < 100 ? `00${n}`.slice(-2) : `${n}`;
  return n === '00' ? '0' : n;
}
