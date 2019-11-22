const mariadbPool = require('../../services/connection');
/**
 * API para validar el usuario
 */
const _postAuth = (req, res, next) => {
    let email = req.body.email || '';
    
    mariadbPool.pool.getConnection()
        .then(conn => {
            conn.query('SELECT * FROM USERS_TBL WHERE EMAIL = ?', [email])
                .then(rows => {
                    rows.length > 0 ?
                        res.status(200).send({ success: true, data: rows[0] }) :
                        res.status(401).send({ success: false, mgs: 'Email not found' })
                    next();
                    conn.end();
                })
                .catch(err => conn.end());

        }).catch(err => {});
};

/**
 * API para obtener los usuarios
 */
const _getUsers = (req, res, next) => {
    mariadbPool.pool.getConnection()
        .then(conn => {
            conn.query('SELECT * FROM USERS_TBL')
                .then(rows => {
                    rows.length > 0 ?
                        res.status(200).send({ success: true, data: rows }) :
                        res.status(401).send({ success: false, mgs: 'Users not found' })
                    next();
                    conn.end();
                })
                .catch(err => conn.end());

        }).catch(err => {});
};

exports.postAuth = _postAuth;
exports.getUsers = _getUsers;
