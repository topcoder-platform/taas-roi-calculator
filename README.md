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
