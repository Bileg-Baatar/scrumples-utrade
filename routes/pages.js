const express = require('express');

const router = express.Router();

router.get('/home', (req, res)=>{
    res.render('home');
});
router.get('/', (req, res)=>{
    res.render('home');
});

router.get('/register', (req, res)=>{
    res.render('register');
});
router.get('/contact', (req, res)=>{
    res.render('contact');
});
router.get('/about', (req, res)=>{
    res.render('about');
});

module.exports = router;