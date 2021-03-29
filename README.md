### Requirements:
- Node v14.15+

### Local deployment
1. Install dependencies
  - `npm install`

2. Run lint
  - `npm run lint`

3. Run test
  - `npm run test`

4. Start app
  - `npm run dev`

To update snapshopt tests, issue the command `npm run update-tests`.

### Heroku deployment
Follow the tutorial in https://devcenter.heroku.com/articles/git
Or:
1. Init git repo:
  - `git init`
  - `git add .`
  - `git commit -m "init"`

2. Push the repo up to Heroku
Install heroku-cli first, then:
  - `heroku create`
  - `git push heroku master`

3. Copy the deployed url on the console and open it in the browser.

### Google Sheets Integration
1. Create your own Google Sheets
   1. Login your Google account at https://docs.google.com/spreadsheets
   2. Create empty sheets
   3. Copy the header row from https://docs.google.com/spreadsheets/d/1sRIijZtI0aFvs-lAl_XnOHuHpgJoZ9hypWhGWYZ_iaM/edit?usp=sharing.
   4. When you create a blank spreadsheet in Google Sheet, you can get its ID from the address bar of your browser. It’s the string of random characters after the /d and before the /edit. Remember this ID for later use.
2. Create credentials for accessing Googlesheets API
   1. Login your Google account at https://developers.google.com/sheets/api/quickstart/nodejs
   2. Click **Enable the Google Sheets API** and enter project name and click **Next**, in my example it's *ROI Calculator*
   3. Select **Web Server** in the **Configure your OAuth client* dropdown**, then click **Create**
   4. Click the **API Console** hyperlink below to go to the console page, then make sure you select the project you just created ![](./readme%20files/select%20your%20project.png)
   5. Click **Credentials** on the left side menu, then click **+ CREATE CREDENTIALS** on the main panel, select **Service Account**
   6. Enter the account name and optionally enter the description for this account, then click **Done**
   7. In the service account page, select **KEYS** tab, click **Add Key**, select **Create new key**, select **Key type** as **JSON** and click **Create**, keep the auto-downloaded JSON file for later use.
   8. Remember the email address your just created for later use ![](./readme%20files/service%20account%20address.png)
   9. In order to edit the spreadsheet we created in step 1 with this service account, we need to grant access to the email address we get from step 2.8
      1. In the spreadsheet, click **Share**
      2. Paste the email address and select it, then click **Done** to share the spreadsheet with it
3. Set up configuration and credentials in the React project
   1. In the config files, change the value of *GOOGLE_SPREADSHEET_ID* to the ID you found at step 1.4
   2. At the developer console page, Credentials tab of your project, click **OAuth client** in the **OAuth 2.0 Client IDs** ![](./readme%20files/oauth%20credentials.png)
      1. Add Authorized JavaScript origins, `http://localhost:3000`, `http://localhost:3100`, these 2 origins are for local deployment. If you plan to deploy the app with other origin, you need to add URI here. After adding all origins, click **Save**
      2. Find the JSON file downloaded in step 2.7, change file name to `googlesheets-credential.json` and move the downloaded JSON file to the root directory of the React project

### Mailchimp Integration
1. Login to the dashboard page of Mailchimp, we need to create some audience fields, ![](readme%20files/mailchimp%20contacts.png)
   1. Click Audience icon on the left side
   2. Click **All Contacts**
   3. Click **Settings** dropdown, then click **Audience fields and \*|MERGE|\* tags**, then add the fields from our sheets that Mailchimp doesn't have by default
      1. Click **Add A Field**, select field type for the field you are about to add
      2. Enter the label for this field, and Optionally enter the tag name for this field in your content
      3. Click **Save Changes**, and Repeat the 3 steps we have just done until all necessary fields are added.
      4. After all fields are added, it should look like this ![](readme%20files/audience%20fields.png)
2. Create automation to send Email when a event is triggered
   1. Click Automation icon on the left side
   2. Click **Create** and click **Classic Automations** ![](readme%20files/mailchimp%20automation.png)
   3. Click **Automated** tab, **API** tab, and click **Event API** entry
   4. Enter Campaign Name(in my example it's *Event API*) and select the audience at which you just added the audience fields, click **Begin**
   5. Click **Edit** on the trigger row, ![](readme%20files/mailchimp%20edit%20trigger.png)
   6. Set delay to **Immediately**, and **Event Name** to `SendCalcResults`, click **Update Trigger**
   7. Click **Design Email**
   8. Enter the email informations you want and click **Next**
   9. Select a template, I will select **Basic** - **1 Column** for simplicity here.
   10. Click the blocks to edit the template, here we will use the tags we added in step 1
   11. Here is how my email template looks ![](readme%20files/mailchimp%20email%20template.png)
   12. Click **Save And Continue**
   13. Make sure the automation is activated, if not, please click back into the automation page and click button in the bottom-right corner to activate

### Zapier Integration
1. After you log in to the dashboard of Zapier, click **Make a Zap**
2. Set up trigger
   1. Search the app **Google Sheets** and select it
   2. Select Trigger event to **New or Updated Spreadsheet Row**, click **Continue**
   3. Click **Sign in to Google Sheets** and sign in with your Google account, click **Continue**
   4. Select the Spreadsheet and Worksheet and click **Continue**
3. Set up Action to add subscriber to Mailchimp
   1. Searh the app **Mailchimp** and select it
   2. Select Action event to **Add/Update Subscriber**, click **Continue**
   3. Click **Sign in to Mailchimp** and sign in with your Mailchimp account, click **Continue**
   4. Select the audience
   5. Click **Subscriber Email** field and select **work_email**
   6. Click **Double Opt-In** field and select **False**
   7. Click **Update Existing** field and select **Yes**
   8. We will skip **Replace Groups**, **Groups** and **Language Code** fields
   9. Click other necessary fields and select the corresponding data from the sheet, and click **Continue**
4. Click to **+** icon below the Action **Add/Update Subscriber in Mailchimp** and set up Action to send custom event to Mailchimp
   1. Search the app **Mailchimp** and select it
   2. Select Action event to **Create Custom Event**, click **Continue**
   3. Choose your Mailchimp account
   4. Select your audience
   5. Select **Email Address** with **Email** field from the previous action
   6. Enter `SendCalcResults` as the **Custom Event Name**, click **Continue**
5. Click the toggle below to turn on the zap