const {admin} = require('../services/firebaseAdmin');

const authenticate = async (req, res, next) => {
  console.log("Admin object import:", admin);  // Verifique o que está sendo importado
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Received Token: ", token);

  if (!token) {
    console.log("Saindo com token nulo")
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Token:", decodedToken); // Verifique o conteúdo do token
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { authenticate };