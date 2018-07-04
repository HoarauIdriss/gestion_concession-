var express = require('express');
var router = express.Router();
var app = express();

var voiture = require("../controllers/voitureController");

//appel de la librarie qui qui permet de copier les images dans un dossier
var multer  = require('multer');
var storage = multer.diskStorage({
  // ajout du chemin de destionation
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../public/img/")
    },
  // création du nom du fichier => ici le même nom que celui d'origine
  // s'il n'est pas défini, choisi une suite de chiffre et lettre généré au hasard
    filename: function (req, file, cb) {
      //  console.log(file.mimetype);
      cb(null, file.originalname)
    }
  });
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', voiture.listaccueil )



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
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/save", upload.single('file-image'), voiture.save);

//editer une voiture
//Afficher une page pour éditer un voiture
router.get("/admin/edit/:id", voiture.edit);

//edit update.  /!\ cest un POST 
//Mettre à jour une voiture de la Collection
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/update/:id", upload.single('file-image'),  voiture.update);


//export du module router
module.exports = router;