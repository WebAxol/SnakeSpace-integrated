'use strict'

import {Router} from 'express';
var router = Router();

// Controller

import RegisterUser from '../../controllers/user/register.js';
import isRegistered from '../../controllers/user/isRegistered.js';


// Routes

router.post('/', (req,res) => { RegisterUser.preRegister(req,res); });
router.get('/email', (req,res) => { isRegistered.isEmailInDB(req,res); });
router.get('/name', (req,res) => { isRegistered.isUsernameInDB(req,res); });



export default router;