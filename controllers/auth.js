const sql = require('mssql');


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


    
// left off 12 min



exports.register = (req, res)=>{
    console.log(req.body);

 


    const {name, email, password, passwordConfirm} = req.body;

    


    res.send("Form submitted");
}