# Automated Testing with BrowserStack

## Setup
1. `npm install`
2. `npm install nightwatch-html-reporter -g`
3. export BROWSERSTACK_USERNAME=<BrowserStack username>
4. export BROWSERSTACK_ACCESS_KEY=<BrowserStack access key>

## Running the tests
1. Run the tests on various browsers: `npm run browserstack`
2. Generate the reports in HTML: `npm run test-reports`

### Chrome only
`npm run test-chrome`

# Automated Testing with Gulp

Nightwatch (http://nightwatchjs.org) is the test framework used for running the functional tests.

## Setup
1. `npm install phantomjs -g`
2. `npm install mocha-phantomjs -g`
3. `npm install nightwatch -g`
4. `npm install geckodriver -g`
5. `npm install chromedriver -g`

## Running the tests
1. Go to the root directory of this project.
2. Launch Selenium Server: `sh test/launch-selenium-server.sh`
3. Open another Terminal window.

### Test on Chrome
`npm run test-chrome`

### Test on Firefox
`npm run test-firefox`

### Test on Safari
On Safari, go to the `Develop` menu and enable `Allow Remote Automation`.
`npm run test-safari`
