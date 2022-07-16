'use strict'

import {Router} from 'express';
var router = Router();

// Controllers

import RegisterController from '../controllers/register.js';

// Routes

router.post('/api/register', (req,res) => { RegisterController.register(req,res); });

export default router;