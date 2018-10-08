import constants from '../app/constants';
import fetch from 'node-fetch';
import random from '../app/services/randomService';
import event from '../app/models/eventModel';
import fileService from '../app/services/fileService';

// NOTE: this file is parsed by jest and uses babel.  This means
// paths outside of imports are not relative to this file
// but instead relative to the root project dir.

test('POST /api/event/create/:token should create a new event', async () => {
    let cancelEvent = await fileService.loadJson('./tests/data/sampleCreate.txt');

    // hijack the load function because it saves work
    // TODO: remove this dependency at some point. 
    let fakeEvent = {userToken: constants.Test.AuthToken};
    let load = (new event()).fromCalendlyEvent.bind(fakeEvent);
    load(cancelEvent);

    let res = await fetch(`${constants.Test.TestUri}/api/event/create/${constants.Test.AuthToken}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cancelEvent)
    });
    expect(res.status).toEqual(201);

    let evt = await event.findOne({userToken: constants.Test.AuthToken});
    expect(evt).toEqual(expect.objectContaining(fakeEvent));
});

test('POST /api/event/cancel/:token should create a new event', async () => {
    let cancelEvent = await fileService.loadJson('./tests/data/sampleCancel.txt');

    // hijack the load function because it saves work
    // TODO: remove this dependency at some point. 
    let fakeEvent = {userToken: constants.Test.AuthToken};
    let load = (new event()).fromCalendlyEvent.bind(fakeEvent);
    load(cancelEvent);

    let res = await fetch(`${constants.Test.TestUri}/api/event/cancel/${constants.Test.AuthToken}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cancelEvent)
    });
    expect(res.status).toEqual(201);

    let evt = await event.findOne({userToken: constants.Test.AuthToken});
    expect(evt).toEqual(expect.objectContaining(fakeEvent));
});

test('GET /api/event/:token should get all unprocessed events', async () => {
    let cancelEvent = await fileService.loadJson('./tests/data/sampleCancel.txt');

    let fakeEvent1 = new event({userToken: constants.Test.AuthToken});
    fakeEvent1.fromCalendlyEvent(cancelEvent);
    await fakeEvent1.save()

    let fakeEvent2 = new event({userToken: constants.Test.AuthToken});
    fakeEvent2.fromCalendlyEvent(cancelEvent);
    await fakeEvent2.save();

    let fakeEvent3 = new event({userToken: constants.Test.AuthToken});
    fakeEvent3.fromCalendlyEvent(cancelEvent);
    fakeEvent3.processed = true;
    await fakeEvent3.save();

    let res = await fetch(`${constants.Test.TestUri}/api/event/${constants.Test.AuthToken}`, {
        method: "GET"
    });

    expect(res.status).toEqual(200);

    let compare1 = fakeEvent1.toObject();
    delete compare1._id;
    compare1.changedAt = compare1.changedAt.toISOString();
    compare1.eventAt = compare1.eventAt.toISOString();

    let compare2 = fakeEvent2.toObject();
    delete compare2._id;
    compare2.changedAt = compare2.changedAt.toISOString();
    compare2.eventAt = compare2.eventAt.toISOString();

    let compare3 = fakeEvent3.toObject();
    delete compare3._id;
    compare3.changedAt = compare3.changedAt.toISOString();
    compare3.eventAt = compare3.eventAt.toISOString();

    let body = await res.json();
    expect(body).toEqual(expect.arrayContaining([
        expect.objectContaining(compare1),
        expect.objectContaining(compare2)
    ]));

    expect(body).toEqual(expect.not.arrayContaining([
        expect.objectContaining(compare3)
    ]));
})