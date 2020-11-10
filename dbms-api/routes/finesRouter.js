const express = require('express');
const bodyParser = require('body-parser');
const db = require('../helper/db_connection');
const auth = require('../helper/authorizeToken');

const finesRouter = express.Router();

finesRouter.use(bodyParser.json());

finesRouter.route('/')
.get(auth.authenticateToken, (req, res, next) => {
    if(req.memb_type != 1) {
        res.statusCode = 401;
        res.json({"message": "Not authorized"});
    }
    db.query(`SELECT f.fine_id, f.issue_id, f.fine_amount, b.memb_id FROM fine AS f JOIN borrows AS b ON f.issue_id = b.issue_id`)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.rows);
    })
    .catch((err) => next(err));
});

finesRouter.route('/:fineId')
.put(auth.authenticateToken, (req, res, next) => {
    if(req.memb_type != 1) {
        res.statusCode = 401;
        res.json({"message": "Not authorized"});
    }
    db.query(`SELECT * FROM fine WHERE fine_id=${req.params.fineId} AND fine_amount > 0`)
    .then((resp) => {
        if(resp.rows.length > 0) {
            db.query(`UPDATE fine SET fine_amount = 0 WHERE fine_id=${req.params.fineId}`)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({"message":"Fine cleared"});
            });
        }
        else {
            res.statusCode = 406;
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"Fine not found"});
        }
    })
});

module.exports = finesRouter;