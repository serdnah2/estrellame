const mariadbPool = require('../../services/connection');
/**
 * API para devolver tanto las estrellas enviadas como las recibidas
 */
const _getUserStars = (req, res, next) => {
    let status = req.params.status;
    let userId = req.params.userId;

    let baseStatement =
        status === 'recibidas'
            ? 'SELECT USERS_STARS_TBL.*, NAME, LASTNAME1, LASTNAME2 FROM USERS_STARS_TBL JOIN USERS_TBL ON USERS_TBL.ID = USERS_STARS_TBL.SENDER_ID WHERE USERS_STARS_TBL.RECEIVER_ID = ? ORDER BY SENT_DATE DESC'
            : 'SELECT USERS_STARS_TBL.*, NAME, LASTNAME1, LASTNAME2 FROM USERS_STARS_TBL JOIN USERS_TBL ON USERS_TBL.ID = USERS_STARS_TBL.RECEIVER_ID WHERE USERS_STARS_TBL.SENDER_ID = ? ORDER BY SENT_DATE DESC';

    mariadbPool.pool
        .getConnection()
        .then(conn => {
            conn.query('SELECT * FROM USERS_TBL WHERE ID = ?', [userId])
                .then(users => {
                    conn.query(baseStatement, [users[0].ID])
                        .then(rows => {
                            res.status(200).send({ data: rows });
                            next();
                            conn.end();
                        })
                        .catch(err => conn.end());
                })
                .catch(() => {
                    res.status(404).send({ error: 'User not found' });
                    conn.end();
                });
        })
        .catch(err => {});
};

exports.getUserStars = _getUserStars;
