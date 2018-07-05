var express = require('express');
var router = express.Router();

// appel de l'userController 
var user = require("../controllers/userController");


// Routes pour la vérification du login
router.post("/login", user.login);

// Routes pour la vérification du login
router.get("/logout", user.logout);

//recuperer la liste des utilisateurs 
//Afficher la page d'accueil ou il y aura la liste des voitures actives
router.get("/admin", user.list);

//voir un utilisateur par son ID 
//Récupérer une voiture depuis la collection selon son ID
router.get("/show/:id", user.show);

//cree un utilisateur
//Afficher une page pour inscrire les utilisateurs
router.get("/create", user.create);

//sauvegarder un utilisateur . /!\ cest un POST 
//Ajouter un ****** dans la Collection
router.post("/admin/save", user.save);

//editer une voiture
//Afficher une page pour éditer un utilisateur
router.get("/admin/edit/:id", user.edit);

//edit update.  /!\ cest un POST 
//Mettre à jour un utilisateur de la Collection
router.post("/admin/update/:id",  user.update);
module.exports = router;
