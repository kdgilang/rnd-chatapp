const mongoose = require('mongoose');
const config = require('../config');
const db = mongoose.createConnection(config.database.getDatabaseUrl('easychat'));
const User = require('../models/users.js');
const request = require('supertest');
const app =  request(require('../app'));
db.dropDatabase();

// TEST USERS API
require('./users')(app);