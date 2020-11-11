require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {
        console.log('yolo');
        console.log(req.headers['authorization']);
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, resp) => {
        if(err) return res.sendStatus(403)
        req.memb_id = resp.memb_id;
        req.memb_type = resp.memb_type;
        next();
    });
};