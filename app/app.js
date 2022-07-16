'use strict'

// Modules

import express from 'express';
import mongoose from 'mongoose';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import pageRoutes from './routes/pages.js';


var app = express(),
    __dirname = dirname(fileURLToPath(import.meta.url));

/* --  Middlewares  --*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Views

app.set('views',join(__dirname,'views'));
app.set('view engine','ejs');

// Routes

app.use(pageRoutes);



// Server & Database

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/reginode')
    .then(() => {   

        console.log('Connection with database was successful');

        app.listen(3800, () => {
            console.log('The server is listening in port ',3800)
        })
    }).catch(err => console.log(err));