const mongoose = require('mongoose');
const User = require('../models/user.js');
const config = require('../config');
const db = mongoose.createConnection(config.database.getDatabaseUrl('easychat'));
const chai = require('chai');
const request = require('supertest');
const app = request(require('../app'));
const should = chai.should();
const expect = chai.expect;
const userTest = require('./users');
db.dropDatabase();

// TEST USERS API
userTest.registerUser(app);
userTest.listsUsers(app, expect, should);