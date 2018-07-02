var express = require('express');
var router = express.Router();
var voiture = require("../controllers/voitureController");

/* GET home page. */
router.get('/', voiture.listaccueil )



// /*Route page description*/
// router.get("/voitures/show/:id", voiture.show);


module.exports = router;
