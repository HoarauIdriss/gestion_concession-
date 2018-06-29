var mongoose = require('mongoose');

var Voiture = require("../models/voiture");

var voitureController = {};


//Lister les voitures et les affiche dans l'index du Back office
voitureController.list = function(req, res) {
    Voiture.find({}).exec(function(err, voitures){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture/index",{voitures:voitures} );
        } 
    });
};

//Affiche une voiture par rapport à son ID
voitureController.show = function(req, res) {
    Voiture.findOne({_id:req.params.id}).exec(function(err, voiture){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture",{voiture:voiture});
        } 
    });
};

//Redirection vers la page de creation d'une voiture
voitureController.create = function(req, res){
    res.render("../views/voiture/create");
}; 

//Enregistrement d'une voiture
voitureController.save = function(req, res){
    var voiture = new Voiture(req.body);

    voiture.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/voiture/create");
        } else{
            console.log("creation voiture OK");
            res.redirect("/voitures/index/" + voiture._id);
        } 
    });
};

//Edition d'un voiture par son id
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

//Gestion de l'edition dun voiture
voitureController.update = function(req, res){
    Voiture.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix} },{new: true}, function (err, voiture){

        if (err){
            console.log(err);
            res.render("../views/voiture/edit",{voiture:req.body} );
        } 
        res.redirect("/voitures/index/" + voiture._id);
        
    });
};

//Export du module
module.exports = voitureController;
