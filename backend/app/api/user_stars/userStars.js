const mariadbPool = require('../../services/connection');
const authenticatedUser = require('../../model/user');
const _getUserStars = (req, res, next) => {
    let status = req.query.status;

    let baseStatement = 'SELECT * FROM USERS_STARS_TBL WHERE ';
    let condition = status === 'recibidas' ? 'RECEIVER_ID = ?' : 'SENDER_ID = ?';

    if (authenticatedUser.email) {
        mariadbPool.pool
            .getConnection()
            .then(conn => {
                conn.query('SELECT * FROM USERS_TBL WHERE EMAIL = ?', [authenticatedUser.email])
                    .then(rows => {
                        conn.query(baseStatement + condition, [rows[0].ID])
                            .then(rows => {
                                res.status(200).send({ data: rows });
                                next();
                                conn.end();
                            })
                            .catch(err => conn.end());
                    })
                    .catch(err => conn.end());
            })
            .catch(err => {});
    } else {
        res.status(401).send();
        next(); 
    }
};

exports.getUserStars = _getUserStars;
