
let constants = {};

// URI configuration
constants.CalendlyHookUri = 'https://calendly.com/api/v1/hooks';
constants.BaseCallbackUri = 'https://tinkler.ngrok.io/api/event';
constants.CreateCallbackUri = `${constants.BaseCallbackUri}/create`;  // UserId is appended since Calendly doesn't give it back
constants.CancelCallbackUri = `${constants.BaseCallbackUri}/cancel`;   // UserId is appended since Calendly doesn't give it back


// Test Configuration
constants.Test = {}
constants.Test.Port = '8087';
constants.Test.DbName = 'calendly_test';
constants.Test.AuthToken = 'NLAHNAHAAMAQ6QIOLYTATYEXJQQJOPWG';
constants.Test.FakeAuthToken = 'fake';

constants.Test.TestUri = 'https://tinklertest.ngrok.io';


export default constants;