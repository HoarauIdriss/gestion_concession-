var express = require('express');
var router = express.Router();
var app = express();

var voiture = require("../controllers/voitureController");


//--------------------------------------------------------
//   GESTION DE L'UPLOAD DE L'IMAGE DANS LA PARTIE CREATION DE L'IMAGE ET L'ÉDITION
//--------------------------------------------------------

//appel de la librarie qui qui permet de copier les images dans un dossier

var multer  = require('multer');
var storage = multer.diskStorage({

  // ajout du chemin de destination

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

//----------------------------------------------------------------------------



// fonction qui permet d'obliger l'utisateur à se logger pour parcourir l'application
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
     next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;    
    res.redirect('/');
  }
}

 
router.get("/admin", requiresLogin , voiture.list);

/* GET home page. */
router.get('/', voiture.listaccueil )


//voir une voiture par son id
//Récupérer une voiture depuis la collection selon son ID
router.get("/show/:id", voiture.show);


//cree une voiture
//Afficher une page pour ajouter un voiture
router.get("/admin/create", requiresLogin , voiture.create);


//sauvegarder une voiture. /!\ cest un POST 
//Ajouter une voiture dans la Collection
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/save", upload.single('file-image'), voiture.save);


//editer une voiture
//Afficher une page pour éditer un voiture
router.get("/admin/edit/:id", requiresLogin , voiture.edit);


//edit update.  /!\ cest un POST 
//Mettre à jour une voiture de la Collection
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/update/:id", upload.single('file-image'),  voiture.update);


//export du module router
module.exports = router;