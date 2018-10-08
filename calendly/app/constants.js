
let constants = {};
constants.CalendlyHookUri = "https://calendly.com/api/v1/hooks";
constants.BaseCallbackUri = "https://tinkler.ngrok.io/api/event";
constants.CreateCallbackUri = `${constants.BaseCallbackUri}/create`;  // UserId is appended since Calendly doesn't give it back
constants.CancelCallbackUri = `${constants.BaseCallbackUri}/cancel`;   // UserId is appended since Calendly doesn't give it back

export default constants;