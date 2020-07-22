const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    user: req.user
  });
  console.log(`${req.user.displayName}(${req.user.id})さんがログインしました`);
});

module.exports = router;