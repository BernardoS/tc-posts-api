const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getAllProfessors = async (req, res) => {
    const professors = await User.find({permission:"professor"});
    res.json(professors);
};

exports.getAllStudents = async (req, res) => {
    const students = await User.find({permission:"student"});
    res.json(students);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.getUserByEmail = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
};

exports.updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
};