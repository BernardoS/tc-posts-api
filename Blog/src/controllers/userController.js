const User = require("../models/User");
const { app } = require("../services/firebase");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../services/firebaseAdmin");

exports.getAllUsers = async (req, res) => {
  console.log("[getAllUsers] iniciando...");
  const users = await User.find();
  console.log("[getAllUsers] finalizando.");
  res.json(users);
};

exports.getAllProfessors = async (req, res) => {
  console.log("[getAllProfessors] iniciando...");
  const professors = await User.find({ permission: "professor" });
  console.log("[getAllProfessors] finalizando.");
  res.json(professors);
};

exports.getAllStudents = async (req, res) => {
  console.log("[getAllStudents] iniciando...");
  const students = await User.find({ permission: "student" });
  console.log("[getAllStudents] finalizando.");
  res.json(students);
};

exports.getUserById = async (req, res) => {
  console.log("[getUserById] iniciando...");
  const user = await User.findById(req.params.id);
  console.log("[getUserById] finalizando.");
  res.json(user);
};

exports.getUserByEmail = async (req, res) => {
  console.log("[getUserByEmail] iniciando...");
  const email = req.params.email;
  const user = await User.find({email:email});
  console.log("[getUserByEmail] finalizando.");
  res.json(user);
};

exports.createUser = async (req, res) => {
  try {
    console.log("[createUser] iniciando...");
    const { email, password, name, permission } = req.body;

    const newUser = new User({ name, email, permission });
    await newUser.save();

    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userResponse = {
      newUser,
      user,
    };

    console.log("[createUser] finalizando.");
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("[createUser] erro:", error);
    res.status(417).json({ code: error.code, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

exports.deleteUserFromDb = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    console.log("[deleteUserFromDb] Successfully deleted user from db");

    res.status(201).json({ message: "Successfully deleted user from db" });

  } catch (error) {
    
    console.error("[deleteUser]:" + error.message);

    res
      .status(417)
      .json({ message: "Error deleting user from db" + error.message });
  }
};

exports.deleteUser = async (req, res) => {
  console.log("[deleteUser] iniciando...");
  try {
    const userId = req.params.id;

    console.log(`[deleteUser] searching user with id: ${userId}`);

    const user = await User.findById(userId);

    console.log(`[deleteUser] Successfully fetched user data:`);

    console.log(user);

    if (!user) throw new Error("[deleteUser] Error to fetch user data");

    console.log(`[deleteUser] Buscando o usuário com o email:${user.email}`);

    const response = await auth.getUserByEmail(user.email).then((data) => {
      console.log(`[deleteUser] Successfully fetched user data from firebase:`);

      console.log("[deleteUser] Info:");

      console.log(data.toJSON());

      const uid = data.toJSON().uid;

      auth.deleteUser(uid).then(() => {

        console.log("[deleteUser] Successfully deleted user from firebase");

        User.findByIdAndDelete(userId).then(()=>{

           console.log("[deleteUser] finalizando.");

           res.status(201).json({ message: "Successfully deleted user" });

        });
      });
    });
  } catch (error) {

    console.error("[deleteUser] Error deleting user:", error);

    res.status(417).json({ message: "Error deleting user" + error.message });

  }
};
