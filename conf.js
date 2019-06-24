import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TotoToto',
  database: 'weird'
});

export default connection;
