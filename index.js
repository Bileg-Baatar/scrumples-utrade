const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req,res)  {
    res.sendFile(path.join(__dirname+'/htmls/home.html'));

});
router.get('/about', function(req,res)  {
    res.sendFile(path.join(__dirname+'/htmls/about.html'));

});
router.get('/contact', function(req,res)  {
    res.sendFile(path.join(__dirname+'/htmls/contact.html'));

});


app.use('/', router);



app.listen(5000, () => {
    console.log('App listening on port 5000');
});
