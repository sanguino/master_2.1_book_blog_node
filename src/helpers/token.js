import jwt from 'jsonwebtoken';

const SECRET = 'superSecret';

export function verifyToken(req, res, next) {
  let token = req.headers['authorization'] || req.headers['Authorization'];
  if (!token || token.split(' ')[0] !== 'Bearer')
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  token = token.split(' ')[1];
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

export function createToken(data) {
  return jwt.sign(data, SECRET, {expiresIn: 86400});
}