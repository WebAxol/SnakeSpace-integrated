'use strict'

import {Router} from 'express';
var router = Router();

router.get('/', (req,res) => { 
    console.log('somebody made a request');
    res.status(200).render('../views/index.ejs') 
});
router.get('/register', (req,res) => { res.status(200).render('../views/register.ejs') });


export default router;