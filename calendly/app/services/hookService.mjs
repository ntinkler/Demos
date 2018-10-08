import user from '../models/userModel';
import fetch from 'node-fetch';
import constants from '../constants'

// TODO: the naming in this file is inconsistent
// createdHook -> createHook
// canceledHook -> cancelHook

// TODO: test this!!!

class hookService {

    callbackUriForUser(type, uri, token) {
        if(type === 'create') {
            return uri === `${constants.CreateCallbackUri + '/' + token}`;
        } else if(type === 'cancel') {
            return uri === `${constants.CancelCallbackUri + '/' + token}`;
        } else {
            throw `Error in hookService.callbackUriForUser - unknown type ${type}`;
        }
    }

    hasCreateHook(dataObj, token) {
        for(let i = 0; i < dataObj.data.length; i++) {
            let elem = dataObj.data[i];
            if(this.callbackUriForUser('create', elem.attributes.url, token) && elem.attributes.events.indexOf('invitee.created') !== -1) {
                return {
                    present: true,
                    hookId: elem.id
                };
            }
        }
        return {
            present: false
        }
    }

    hasCancelHook(dataObj, token) {
        for(let i = 0; i < dataObj.data.length; i++) {
            let elem = dataObj.data[i];
            if(this.callbackUriForUser('cancel', elem.attributes.url, token) && elem.attributes.events.indexOf('invitee.canceled') !== -1) {
                return {
                    present: true,
                    hookId: elem.id
                };
            }
        }
        return {
            present: false
        }
    }

    async checkHooks(token) {
        let res = await fetch(constants.CalendlyHookUri, {
            method: "GET",
            headers: {
                "X_TOKEN": token,
            }
        });

        let body = await res.json();

        return {
            canceledHook: this.hasCancelHook(body, token),
            createdHook: this.hasCreateHook(body, token)
        }
    }

    async createCreatedHook(token) {
        var res = await fetch(constants.CalendlyHookUri, {
            method: "POST",
            headers: {
                "X_TOKEN": token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `url=${constants.CreateCallbackUri + '/' + token}&events[]=invitee.created`
        });
        var body = await res.json();
        return body.id;
    }

    async createCanceledHook(token) {
        var res = await fetch(constants.CalendlyHookUri, {
            method: "POST",
            headers: {
                "X_TOKEN": token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `url=${constants.CancelCallbackUri + '/' + token}&events[]=invitee.canceled`
        });
        var body = await res.json();
        return body.id;
    }

    async createHooks(token) {
        var hooks = await this.checkHooks(token);
        if(!hooks.createdHook.present) {
            // TODO: error handling for calendly
            hooks.createdHook.hookId = await this.createCreatedHook(token);
            hooks.createdHook.present = true;
        }

        if(!hooks.canceledHook.present) {
            // TODO: error handling for calendly
            hooks.canceledHook.hookId = await this.createCanceledHook(token);
            hooks.canceledHook.present = true;
        }

        return hooks;
    }
    
}

let hs = new hookService();

export default hs;