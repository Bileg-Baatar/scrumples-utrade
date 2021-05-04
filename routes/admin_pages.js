var express = require('express');
var router = express.Router();

// pages index

router.get('/', function(req, res){

    res.send('admin area');
})


// add pages

router.get('/add-page', function(req, res){

    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content


    })

})
module.exports = router;












