const mongoose = require('mongoose');
const User = require('../models/User');
const userController = require('./userController');

jest.mock('../models/User');
