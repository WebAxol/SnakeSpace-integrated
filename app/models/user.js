'use strict'

import mongoose from "mongoose";

var Schema = mongoose.Schema;

var UserSchema = Schema({
    username : String,
    email    : String,
    password : String
});

export default mongoose.model('User', UserSchema);