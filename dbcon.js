var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_levyca',
  password        : '8945',
  database        : 'cs290_levyca'
});

module.exports.pool = pool;
