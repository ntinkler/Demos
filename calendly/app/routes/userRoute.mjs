import express from 'express';
import user from '../models/userModel';
const userRouter = express.Router();

userRouter
    .get('/:userId', (req,res) => {
        res.json({message: "GET USER"});
    })
    .get('/', (req, res) => {

    })
    .post('/', (req, res) => {



    })
    .delete('/', (req,res) => {
        res.json({message: "DELETE USER"});
    });

export default userRouter;