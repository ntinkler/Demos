
let constants = {};

// URI configuration
constants.CalendlyHookUri = 'https://calendly.com/api/v1/hooks';
constants.Host = process.env.base_uri || 'tinkler.ngrok.io';
constants.BaseCallbackUri = `https://${constants.Host}/api/event`;
constants.CreateCallbackUri = `${constants.BaseCallbackUri}/create`;  // UserId is appended since Calendly doesn't give it back
constants.CancelCallbackUri = `${constants.BaseCallbackUri}/cancel`;   // UserId is appended since Calendly doesn't give it back

console.log(constants.BaseCallbackUri);

// Test Configuration
constants.Test = {}
constants.Test.Port = '8087';
constants.Test.DbName = 'calendly_test';
constants.Test.AuthToken = 'NLAHNAHAAMAQ6QIOLYTATYEXJQQJOPWG';
constants.Test.FakeAuthToken = 'fake';

constants.Test.TestUri = 'http://localhost:8087';


export default constants;