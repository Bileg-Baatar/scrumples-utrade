const express = require("express");
const app = express();
const path = require("path");
const sql = require('mssql');


var config = {
    user: 'scrumples',
    password: 'Utrade1234',
    server: 'utrade.database.windows.net',
    port: 1433,
    database: 'utrade-scrumples',
    options: {
        encrypt: true,
        connectTimeout:15000,
        requestTimeout:150000
    },
    
}

var conn = new sql.ConnectionPool(config);

conn.connect().then(function (){
    var req = new sql.Request(conn);

    req.query("SELECT email FROM [dbo].[users]")
    .then(function(recordset){
    console.log(recordset);
    conn.close();
    });
});








const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.set('view engine', 'hbs');

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server started at http://localhost:'+port);

 
      
}

)