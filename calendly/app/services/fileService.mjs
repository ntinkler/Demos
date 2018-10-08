import fs from 'fs-extra';

function loadJson(path) {
    return new Promise(function(resolve, reject) {
        fs.readJson(path, function(err, obj) {
            if(err) {
                reject(err);
            } else {
                resolve(obj);
            }
        });
    });
}

var fileService = {};
fileService.loadJson = loadJson;

export default fileService;

