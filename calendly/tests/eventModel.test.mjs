import fs from 'fs-extra';
import event from '../app/models/eventModel';
import fileService from '../app/services/fileService';

// NOTE: this file is parsed by jest and uses babel.  This means
// paths outside of imports are not relative to this file
// but instead relative to the root project dir.

test('Events can be created from calendly cancel events', async () => {
    let cancelEvent = await fileService.loadJson('./tests/data/sampleCancel.txt');
    let evt = new event();
    evt.fromCalendlyEvent(cancelEvent);

    expect(evt.type).toEqual('cancel');
    expect(evt.invitee).toEqual('NT (tinklern@gmail.com)');
    expect(evt.inviter).toEqual('Nathaniel Tinkler (tinklern+test@gmail.com)');
    expect(evt.changedAt).toEqual(new Date('2018-10-08T19:50:20Z'));
    expect(evt.eventAt).toEqual(new Date('2018-10-09T10:00:00-04:00'));
    expect(evt.name).toEqual('15 Minute Meeting');
    expect(evt.location).toBeNull();
    expect(evt.processed).toBeFalsy();
});

test('Events can be created from calendly create events', async () => {
    let createEvent = await fileService.loadJson('./tests/data/sampleCreate.txt');
    let evt = new event();
    evt.fromCalendlyEvent(createEvent);

    expect(evt.type).toEqual('create');
    expect(evt.invitee).toEqual('NT (tinklern@gmail.com)');
    expect(evt.inviter).toEqual('Nathaniel Tinkler (tinklern+test@gmail.com)');
    expect(evt.changedAt).toEqual(new Date('2018-10-08T20:03:39Z'));
    expect(evt.eventAt).toEqual(new Date('2018-10-09T16:00:00-04:00'));
    expect(evt.name).toEqual('15 Minute Meeting');
    expect(evt.location).toBeNull();
    expect(evt.processed).toBeFalsy();
});