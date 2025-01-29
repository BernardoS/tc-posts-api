const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { getAuth } = require("firebase-admin/auth");



const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env');
  const envData = fs.readFileSync(envPath, 'utf8');
  const envVariables = envData.split('\n');

  envVariables.forEach((variable: string) => {
    const [key, ...valueParts] = variable.split('=');
    const value = valueParts.join('=').trim(); // Caso o valor tenha '=' no meio
    if (key && value) {
      process.env[key.trim()] = value.replace(/\\n/g, '\n'); // Converte \n literal para quebra real
    }
  });
};

loadEnv();

const serviceAccount = {
  type: process.env.FIREBASE_CREDENTIAL_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = getAuth(adminApp);

exports.auth = auth;

exports.admin = adminApp;