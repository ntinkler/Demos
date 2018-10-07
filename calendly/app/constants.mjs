class Constants {
    CalendlyHookUri = "https://calendly.com/api/v1/hooks";
    BaseCallbackUri = "https://tinkler.ngrok.io/api/event";
    CreateCallbackUri = `${BaseCallbackUri}/create`;  // UserId is appended since Calendly doesn't give it back
    CancelCallbackUri = `${BaseCallbackUri}/cancel`;   // UserId is appended since Calendly doesn't give it back
}

let c = new Constants();

export default c;