const express = require('express');
const bodyParser = require('body-parser');
const db = require('../helper/db_connection');
const auth = require('../helper/authorizeToken');

const booksRouter = express.Router();

booksRouter.use(bodyParser.json());

booksRouter.route('/')
.get(auth.authenticateToken, (req, res, next) => {
    db.query(`SELECT b.book_id, b.book_title, b.book_author, p.publisher_name FROM book AS b JOIN publisher AS p ON b.publisher_id = p.publisher_id`)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.rows);
    })
    .catch((err) => next(err));
})
.post(auth.authenticateToken, (req, res, next) => {
    if(req.memb_type != 1) {
        res.statusCode = 401;
        res.json({"message": "Not authorized"});
    }
    db.query(`SELECT book_id FROM book WHERE book_title = '${req.body.book_title}'`)
    .then((book_id) => {
        if(book_id.rows.length == 0) {
            //Get publisher id
            db.query(`SELECT publisher_id FROM publisher WHERE publisher_name='${req.body.publisher_name}'`)
            .then((publisher_id) => {
                if(publisher_id.rows.length == 0) {
                    //Insert into publisher
                    db.query(`INSERT INTO publisher (publisher_name) VALUES ('${req.body.publisher_name}')`)
                    .then((resp) => {
                        //Get publisher_id
                        db.query(`SELECT publisher_id FROM publisher WHERE publisher_name='${req.body.publisher_name}' LIMIT 1`)
                        .then((publisher_id) => {
                            //Insert into book
                            db.query(`INSERT INTO book (book_title, book_price, publisher_id, book_author) VALUES ('${req.body.book_title}',
                            '${req.body.book_price}', ${publisher_id.rows[0].publisher_id}, ${req.body.book_author})`)
                            .then((resp) => {
                                //Get book_id
                                db.query(`SELECT book_id FROM book WHERE book_title = '${req.body.book_title}'`)
                                .then((book_id) => {
                                    db.query(`INSERT INTO book_listing (book_isbn, book_available, book_id) VALUES (${req.body.book_isbn},
                                        ${req.body.book_available}, ${book_id.rows[0].book_id})`)
                                        .then((resp) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json({"message": "New book and new publisher added"});
                                        }, (err) => next(err));
                                }, (err) => next(err))
                            }, (err) => next(err));
                        }, (err) => next(err));
                    }, (err) => next(err));
                }
                else {
                    db.query(`INSERT INTO book (book_title, book_price, publisher_id, book_author) VALUES ('${req.body.book_title}',
                    ${req.body.book_price}, ${publisher_id.rows[0].publisher_id}, ${req.body.book_author})`)
                    .then((resp) => {
                        //Get book_id
                        db.query(`SELECT book_id FROM book WHERE book_title = '${req.body.book_title}'`)
                        .then((book_id) => {
                            db.query(`INSERT INTO book_listing (book_isbn, book_available, book_id) VALUES (${req.body.book_isbn},
                                ${req.body.book_available}, ${book_id.rows[0].book_id})`)
                                .then((resp) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({"message": "New book added to listing"});
                                }, (err) => next(err));
                        }, (err) => next(err))
                    }, (err) => next(err));
                }
            }, (err) => next(err))
        }
        else {
            db.query(`INSERT INTO book_listing (book_isbn, book_available, book_id, book_author) VALUES (${req.body.book_isbn},
                ${req.body.book_available}, ${book_id.rows[0].book_id}, ${req.body.book_author})`)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({"message": "Existing book added to listing"});
                }, (err) => next(err));
        }
    })
    .catch((err) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({"message": "This book cannot be added", "err": err});
    });
});

booksRouter.route('/:bookId')
.get(auth.authenticateToken, (req, res, next) => {
    db.query(`SELECT a.book_isbn, a.book_available, b.book_title, b.book_price, b.book_author, c.publisher_name FROM book_listing AS a JOIN book
     AS b ON a.book_id = b.book_id JOIN publisher AS c ON c.publisher_id = b.publisher_id AND b.book_id = ${req.params.bookId}`, (err, resp) => {
        if(err) {
            return next(err);
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp.rows);
        }
    });
});

booksRouter.route('/return/:issueId')
.post(auth.authenticateToken, (req, res, next) => {
    db.query(`SELECT book_isbn, EXTRACT(DAY FROM now() - due_date) AS days FROM borrows 
    WHERE issue_id = ${req.params.issueId} AND due_date > '1970-01-01' AND memb_id = ${req.memb_id}`)
    .then((resp) => {
        if(resp.rows.length > 0) {
            var days = resp.rows[0].days;
            if(days > 0) {
                var fine = 100;
                db.query(`INSERT INTO fine (issue_id, fine_amount) VALUES
                (${req.params.issueId}, ${fine})`);
            }
            db.query(`UPDATE book_listing SET book_available = 1 WHERE book_isbn = ${resp.rows[0].book_isbn} AND book_available = 0`)
            .then((resp) => {
                db.query(`UPDATE borrows SET due_date = '1970-01-01' WHERE issue_id = ${req.params.issueId}`)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({"message":"Book returned"});
                });
            }, (err) => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({"message":"Book not returned", "err": err});
            });
        }
        else {
            res.statusCode = 406;
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"Book never borrowed"});
        }
    }, (err) => {
        console.log(err);
        res.statusCode = 406;
        res.setHeader('Content-Type', 'application/json');
        res.json({"message":"Book never borrowed", "err": err});
    });
});

module.exports = booksRouter;