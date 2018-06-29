var mongoose = require('mongoose');

var Voiture = require("../models/Voiture");

var voitureController = {};


//Liste les voitures
voitureController.list = function(req, res) {
    Voiture.find({}).exec(function(err, voitures){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture/index",{voitures:voitures} );
        } 
    });
};

//Affiche 1 voiture par son id
voitureController.show = function(req, res) {
    Voiture.findOne({_id:req.params.id}).exec(function(err, voiture){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture/show",{voiture:voiture});
        } 
    });
};

//redirection à la page de creation de voiture
voitureController.create = function(req, res){
    res.render("../views/voiture/create");
}; 

//enregistrement des voitures
voitureController.save = function(req, res){
    var voiture = new Voiture(req.body);

    voiture.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/voiture/create");
        } else{
            console.log("creation voiture OK");
            res.redirect("/voitures/show/" + voiture._id);
        } 
    });
};

//edition d'un voiture par son id
voitureController.edit = function(req, res){
    var voiture = new Voiture(req.body);

    Voiture.findOne({_id:req.params.id}).exec(function(err, voiture){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/voiture/edit",{voiture: voiture} );
        } 
    });
};

//gestion de l'edition d'une voiture
voitureController.update = function(req, res){
    Voiture.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix} },{new: true}, function (err, voiture){

        if (err){
            console.log(err);
            res.render("../views/voiture/edit",{voiture:req.body} );
        } 
        res.redirect("/voitures/show/" + voiture._id);
        
    });
};

//export du module
module.exports = voitureController;
