const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const config = require('config');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const sheetApiKey = require('./googlesheets-credential.json');

const GOOGLE_SHEET_COLUMNS = [
  'type_of_talent',
  'number_of_people_required',
  'industry',
  'company_size',
  'cost_of_living',
  'first_name',
  'last_name',
  'company',
  'work_email',
  'average_salary',
  'bonuses_and_benefits',
  'recruitment_and_overhead',
  'total_annually',
  'weekly_cost',
  'topcoder_weekly_cost',
  'you_save',
  'date_time_created',
  'ip_address',
  'browser',
];

// configure a JWT auth client
const jwtClient = new google.auth.JWT(
  sheetApiKey.client_email,
  null,
  sheetApiKey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const addRowSchema = joi.object({
  type_of_talent: joi.string().required(),
  number_of_people_required: joi.number().required(),
  industry: joi.string().required(),
  company_size: joi.string().required(),
  cost_of_living: joi.string().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  company: joi.string().required(),
  work_email: joi.string().required(),
  average_salary: joi.number().required(),
  bonuses_and_benefits: joi.number().required(),
  recruitment_and_overhead: joi.number().required(),
  total_annually: joi.number().required(),
  weekly_cost: joi.number().required(),
  topcoder_weekly_cost: joi.number().required(),
  you_save: joi.number().required(),
  browser: joi.string().required(),
});
router.post('/add-row', validator.body(addRowSchema), function (req, res) {
  const createTime = new Date().toISOString();
  // authenticate request
  jwtClient.authorize(function (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
      return;
    } else {
      const row = GOOGLE_SHEET_COLUMNS.map((val) => {
        return req.body[val] || '';
      });
      row[GOOGLE_SHEET_COLUMNS.indexOf('date_time_created')] = createTime;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      row[GOOGLE_SHEET_COLUMNS.indexOf('ip_address')] = ip;
      // Google Sheets API
      const sheets = google.sheets('v4');
      sheets.spreadsheets.values.append({
        auth: jwtClient,
        // The ID of the spreadsheet to update.
        spreadsheetId: config.GOOGLE_SPREADSHEET_ID,
        // How the input data should be interpreted.
        valueInputOption: 'RAW',
        // How the input data should be inserted.
        insertDataOption: 'INSERT_ROWS',
        // append the data from column A to column S
        range: 'A1:S',
        requestBody: {
          majorDimension: 'ROWS', // log each entry as a new row (vs column)
          values: [
            row,
          ],
        },
      }).then(() => {
        res.sendStatus(200);
      }, () => {
        res.status(500).send('Googlesheets API insert error');
      });
    }
  });
});

module.exports = router;
