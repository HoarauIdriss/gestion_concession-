var express = require('express');
var router = express.Router();

var multer  = require('multer');
var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../public/img/")
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      console.log(file.mimetype);
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

var voiture = require("../controllers/voitureController");

//recuperer les voitures
//Afficher la page d'accueil ou il y aura la liste des voitures actives
//Récupérer la liste des voitures depuis la Collection
router.get("/admin", voiture.list);

//voir une voiture par son id
//Récupérer une voiture depuis la collection selon son ID
router.get("/show/:id", voiture.show);

//cree une voiture
//Afficher une page pour ajouter un voiture
router.get("/admin/create", voiture.create);

//sauvegarder une voiture. /!\ cest un POST 
//Ajouter une voiture dans la Collection
router.post("/admin/save",upload.single('image'), voiture.save);

//editer une voiture
//Afficher une page pour éditer un voiture
router.get("/admin/edit/:id", voiture.edit);

//edit update.  /!\ cest un POST 
//Mettre à jour une voiture de la Collection
router.post("/admin/update/:id", voiture.update);


//export du module router
module.exports = router;