import jwt from 'jsonwebtoken';

const SECRET = 'superSecret';

export function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

export function createToken(data) {
  jwt.sign(data, SECRET, {expiresIn: 86400});
}