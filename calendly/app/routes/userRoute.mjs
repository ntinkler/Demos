import express from 'express';
import user from '../models/userModel';
import hookService from '../services/hookService';
const userRouter = express.Router();

userRouter

    .get('/:userId', (req,res) => {
        res.json({message: "GET USER"});
    })

    .get('/', (req, res) => {

    })

    .post('/', (req, res) => {


        let newUser = new user({token: req.body.token});
        console.log(newUser.validateSync());

        let testUser = new user();
        console.log(testUser.validateSync());
        newUser.createHooks(hookService);

    })

    .delete('/', (req,res) => {
        res.json({message: "DELETE USER"});
    });

export default userRouter;