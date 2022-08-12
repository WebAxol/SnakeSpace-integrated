'use strict'

import {Router} from 'express';
var router = Router();

// Controllers

import LoginController from '../../controllers/login.js';

// Routes

router.get('/', (req,res) => { LoginController.login(req,res) });

router.get('/check-session', (req,res) => {true
    if(req.session.username){
        res.send({
            session : true
        });
    }
    else{
        res.send({
            session : false
        });
    }
})


export default router;