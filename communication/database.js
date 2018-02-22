var sqlite3 = require('sqlite3');
var db= new sqlite3.Database('digitalTwin.db');

db.run('CREATE TABLE tempurature(ID INTEGER PRIMARY KEY,tempurature TEXT)');


var stmt = db.prepare("INSERT INTO tempurature VALUES (?,?)");
for(var i=0;i<100;i++)
{
    stmt.run(i,5*i);
}

// db.close();
