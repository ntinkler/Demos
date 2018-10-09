import express from 'express';
import event from '../models/eventModel';

const eventRouter = express.Router();

eventRouter

    .post('/create/:token', async (req,res) => {
        let newEvent = new event({userToken: req.params.token});
        newEvent.fromCalendlyEvent(req.body);
        newEvent.save();
        res.status(201).send();
    })

    .post('/cancel/:token', async (req, res) => {
        let newEvent = new event({userToken: req.params.token});
        newEvent.fromCalendlyEvent(req.body);
        newEvent.save();
        res.status(201).send();
    })

    .get('/:token', async (req, res) => {
        let {start, end, processed} = processQueryParams(req.query);
        let results;
        if(processed) {
            results = await event.find({userToken: req.params.token, changedAt: {"$gte": start, "$lt": end}});
        } else {
            results = await event.find({userToken: req.params.token, processed: false, changedAt: {"$gte": start, "$lt": end}});
        }

        for(let i = 0; i < results.length; i++) {
            results[i].processed = true;
            await results[i].save();
        }
        
        res.json(results);
    })

    function processQueryParams(params) {
        var res = {};
        res.start = params.hasOwnProperty('start') ? new Date(params.start) : new Date('2017-01-01');
        res.end = params.hasOwnProperty('end') ? new Date(params.end) : new Date('2048-01-01');
        res.processed = params.hasOwnProperty('processed') && params.processed;
        return res;
    }

export default eventRouter;