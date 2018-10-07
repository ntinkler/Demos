import hook from '../models/hookModel';
import user from '../models/userModel';
import fetch from 'node-fetch';
import constants from '../constants'


class hookService {


    constructor(token) {
        this.token = token;
    }

    createHooks() {

        return fetch(constants.CalendlyHookUri, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "X_TOKEN": this.token,
            }
        })

    }

}

export default hookService;