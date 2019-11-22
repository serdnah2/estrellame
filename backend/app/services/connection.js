const mariadb = require('mariadb');
const _pool = mariadb.createPool({host: '127.0.0.1', user: 'root', database: 'starme_db', charset : 'utf8'});

exports.pool = _pool;
