'use strict'

// Modules

import express from 'express';
import express_session from 'express-session';
import mongoose from 'mongoose';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Route files

import pageRoutes from './routes/pages.js';
import registerAPI from './routes/apis/register.js';


var app = express(),
    __dirname = dirname(fileURLToPath(import.meta.url));

/* --  Middlewares  --*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express_session({
    'secret' : 'aswfef',
    'resave' : false,
    'saveUninitialized' : true
}));

// Views

app.set('views',join(__dirname,'views'));
app.set('view engine','ejstrings');

// Routes

app.use(pageRoutes);
app.use('/api/register',registerAPI);

// Public files

app.use(express.static(join(__dirname,'public')));

// Server & Database

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/reginode')
    .then(() => {   

        console.log('Connection with database was successful');

        app.listen(3800, () => {
            console.log('The server is listening in port ',3800)
        })
    }).catch(err => console.log(err));