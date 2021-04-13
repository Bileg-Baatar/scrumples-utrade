const express = require("express");
const app = express();
const sql = require('mssql');
const path = require('path');

const config ={

    user: 'scrumples',
    password: 'Utrade1234',
    server: 'utrade.database.windows.net',
    database: 'utrade-scrumples',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};

sql.connect(config);
const request = new sql.Request();

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
    console.log("Server started on port"+ port);

 
      
}

)