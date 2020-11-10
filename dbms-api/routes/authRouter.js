require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../helper/db_connection');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.use(bodyParser.json());

authRouter.route('/login').post((req, res, next) => {
    db.query(`SELECT * FROM members WHERE memb_id = ${req.body.memb_id}`)
    .then((resp) => {
        if(resp.rows.length > 0) {
            const memb_type = resp.rows[0].memb_type;
            const payload = { memb_id: req.body.memb_id, memb_type: memb_type };

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        }
        else {
            res.statusCode = 401;
            res.json({"message": "User ID not found"});
        }
    })

});

module.exports = authRouter;