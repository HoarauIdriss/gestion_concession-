var express = require('express');
var router = express.Router();
var voiture = require("../controllers/voitureController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Route page description*/
router.get("/voiture/:id", voiture.show);


module.exports = router;
