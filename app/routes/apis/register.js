'use strict'

import {Router} from 'express';
var router = Router();

// Controller

import RegisterController from '../../controllers/register.js';

// Routes

router.post('/', (req,res) => { RegisterController.preRegister(req,res); });
router.get('/email', (req,res) => { RegisterController.isEmailInDB(req,res); });
router.get('/username', (req,res) => { RegisterController.isUsernameInDB(req,res); });



export default router;