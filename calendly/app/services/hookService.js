import hook from '../models/hookModel';
import user from '../models/userModel';
import fetch from 'node-fetch';
import constants from '../constants'


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
        let present = false;
        let hookId = -1;
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
        let present = false;
        let hookId = -1;
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

    checkHooks(token) {
        return fetch(constants.CalendlyHookUri, {
            method: "GET",
            headers: {
                "X_TOKEN": token,
            }
        })

        .then(res => res.json())
        
        .then((hooks) => {

            let createdHook = this.hasCreateHook(hooks, token);
            let cancelHook = this.hasCancelHook(hooks, token);
            

        })
    }

    createHooks(token) {
        return null;
        return fetch(constants.CalendlyHookUri, {
            method: "POST",
            headers: {
                "X_TOKEN": token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `url=${constants.CreateCallbackUri + '/' + token}&events[]=invitee.created`
        })
    }

}

let hs = new hookService();

export default hs;