import mysql from 'mysql2'; 

// MySQL database connection configuration
// const db = mysql.createConnection({
//   host: '107.181.238.60',
//   user: 'tojoglobal_tojoglobal',
//   password: '&]eEs-iaKUrY',
//   database: 'tojoglobal_tojoglobal',
//     port: 3306,
//   connectTimeout: 10000 
// });  

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tojoglobal_tojoglobal',
    port: 3306,
  connectTimeout: 10000 
});  

// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
  });

export default db;