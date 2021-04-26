
const sql = require('mssql');


var config = {
    user: 'scrumples',
    password: 'Utrade1234',
    server: 'utrade.database.windows.net',
    port: 1433,
    database: 'utrade-scrumples',
    options: {
        encrypt: true,
        connectTimeout: 15000,
        requestTimeout: 150000
    },

}











exports.register = (req, res) => {
    var conn = new sql.ConnectionPool(config);

    conn.connect().then(function () {
        console.log(req.body);
    
        const { name, a_email, password, passwordConfirm } = req.body;

        var re = new sql.Request(conn);
        re.query("SELECT * FROM [dbo].[users]")
        .then(function(recordset){
        console.log(recordset);
        
        });
        var e = 'bilegb@gmail.com'
        re.query('SELECT * FROM [dbo].[users] WHERE email = "'+e+'" ', (error, results) => {
            if (error) {
                console.log(error);
                return
            }
            if (results.length > 0) {
                return res.render('register', {
                    
                    message: 'That email is already in use'
                    
                })
                
            } else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Passwords do not match'
                });
            }
           
        })

        /*req.query('INSERT into [dbo].[users] ([name],[email],[pass]) values =?'[name], [email], [password], (error, results) => {
            if (error) {
                console.log(error);

            } else {
                console.log(results);
                return res.render('register', { message: 'User registered' });
            }
        });
        */
    });

    



}