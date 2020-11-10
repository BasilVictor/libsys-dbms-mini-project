const express = require('express');
const bodyParser = require('body-parser');
const db = require('../helper/db_connection');
const auth = require('../helper/authorizeToken');

const borrowsRouter = express.Router();

borrowsRouter.use(bodyParser.json());

borrowsRouter.route('/')
.get(auth.authenticateToken, (req, res, next) => {
    console.log(req.memb_id);
    db.query(`SELECT br.issue_id, br.due_date, b.book_title FROM borrows AS br JOIN book_listing AS bl ON br.book_isbn = bl.book_isbn 
    JOIN book AS b ON bl.book_id = b.book_id AND br.memb_id = ${req.memb_id} AND br.due_date > '1970-01-01'`)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.rows);
    })
    .catch((err) => next(err));
});

borrowsRouter.route('/:bookISBN')
.post(auth.authenticateToken, (req, res, next) => {
    var mem_id = 101;
    db.query(`UPDATE book_listing SET book_available = 0 WHERE book_isbn = ${req.params.bookISBN} AND book_available = 1`)
    .then((resp) => {
        console.log(resp);
        if(resp.rowCount > 0) {
            var due_date = new Date();
            due_date.setDate(due_date.getDate() + 15);
            var dd = due_date.getDate();
            var mm = due_date.getMonth() + 1;
            var yyyy = due_date.getFullYear();
            var due_date_string = yyyy + "-" + mm + "-" + dd;

            db.query(`INSERT INTO borrows (book_isbn, due_date, memb_id) VALUES
            (${req.params.bookISBN}, '${due_date_string}', ${mem_id})`)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({"message":"Book borrowed"}); 
            });
        }
        else {
            res.statusCode = 406;
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"Book cannot be borrowed"});
        }
    });
});

module.exports = borrowsRouter;