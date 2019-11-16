const mariadbPool = require('../../services/connection');
const authenticatedUser = require('../../model/user');
const _postAuth = (req, res, next) => {

    let email = req.body.email;
    
    mariadbPool.pool.getConnection()
        .then(conn => {
            authenticatedUser.email = '';
            conn.query('SELECT * FROM USERS_TBL WHERE EMAIL = ?', [email])
                .then((rows) => {
                    res.status(200).send({ data: rows });
                    authenticatedUser.email = rows[0].EMAIL;
                    next();
                    conn.end();
                })
                .catch(err => conn.end());

        }).catch(err => {});
};

exports.postAuth = _postAuth;