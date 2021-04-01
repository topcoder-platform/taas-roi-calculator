import axios from 'axios';
import { detect } from 'detect-browser';

const browser = detect();

const axiosInstance = axios.create();

/**
 * POST row object to frontend server, so that frontend server appends the row in google sheet
 * @param {Object} row a row object containing fields in the google sheet
 * @returns axios request Promise
 */
export function addRow(row) {
  const newRow = {
    ...row,
    browser: `${browser.os} ${browser.name} ${browser.version}`,
  };
  return axiosInstance.post('/sheets-api/add-row', newRow);
}

export default addRow;
