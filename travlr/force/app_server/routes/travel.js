var express = require('express');
var router = express.Router();

/* GET travel page. */
router.get('/', function(req, res, next) {
  res.render('travel', { title: 'Travlr Getaways' });
});

module.exports = router;
