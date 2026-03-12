const jwt = require('jsonwebtoken');
const user = require('../list/user.json');
const publicKey = require('../list/publicKey.json');
var userInfo = { id: user[7].id, password: user[7].pw, auth: user[7].auth };
var secretKey = publicKey.publicKey + user[7].primaryKey;
var options = { issuer: 'manseAPI', subject: 'api' };

jwt.sign(userInfo, secretKey, options, function (err, token) {
  if (err) console.log(err);
  else console.log(token);
});
