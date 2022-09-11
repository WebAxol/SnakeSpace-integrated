'use strict'

import {Router} from 'express';
var router = Router();

// Controllers

import Login from '../../controllers/session/login.js';

// Routes

router.get('/', (req,res) => { Login.login(req,res) });

router.get('/check', (req,res) => {true
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