'use strict'

import {Router} from 'express';
var router = Router();

// Controller

import RegisterController from '../../controllers/register.js';

// Routes

router.post('/', (req,res) => { RegisterController.register(req,res); });


export default router;