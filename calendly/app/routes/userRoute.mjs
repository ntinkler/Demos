import express from 'express';
import user from '../models/userModel';
import hookService from '../services/hookService';
const userRouter = express.Router();

userRouter

    .get('/:token', async (req,res) => {
        let currentUser = await user.findOne({token: req.params.token});
        if(currentUser) {
            res.json(currentUser);
        } else {
            res.status(404).json({error: `User ${req.params.token} does not exist`})
        }
    })

    .get('/', async (req, res) => {
        let results = await user.find({});
        res.json({users: results});
    })

    .post('/:token', async (req, res) => {
        let existingUser = await user.findOne({token: req.params.token});
        if(existingUser) {
            res.status(422).json({error: `User ${req.params.token} already exists`});
            return;
        }

        let newUser = new user({token: req.params.token});
        await newUser.createHooks(hookService);
        await newUser.save();
        res.status(201).json(newUser);
    })

    .delete('/:token', async (req,res) => {
        await user.remove({token: req.params.token});
        res.status(204).send();
    });

export default userRouter;