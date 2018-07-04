var express = require('express');
var router = express.Router();


var user = require("../controllers/userController");

// /* GET home page. */
// router.get('/', user.listaccueil )

//recuperer les voitures
//Afficher la page d'accueil ou il y aura la liste des voitures actives
//Récupérer la liste des voitures depuis la Collection
router.get("/admin", user.list);

//voir une voiture par son id
//Récupérer une voiture depuis la collection selon son ID
router.get("/show/:id", user.show);

//cree un utilisateur
//Afficher une page pour inscrire les utilisateurs
router.get("/create", user.create);

//sauvegarder une voiture. /!\ cest un POST 
//Ajouter une voiture dans la Collection
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/save", user.save);

//editer une voiture
//Afficher une page pour éditer un voiture
router.get("/admin/edit/:id", user.edit);

//edit update.  /!\ cest un POST 
//Mettre à jour une voiture de la Collection
//upload.single('file-image') indique dans quel input type=file il faudra aller recupérer l'image
router.post("/admin/update/:id",  user.update);
module.exports = router;
