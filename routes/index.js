var express = require('express');
var router = express.Router();
// var voiture = require("../controllers/voitureController");

/* GET home page. */
router.get('/',function (req,res){
    res.render("index");
});



// /*Route page description*/
// router.get("/voitures/show/:id", voiture.show);


module.exports = router;
