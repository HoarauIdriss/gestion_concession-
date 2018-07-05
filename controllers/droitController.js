var mongoose = require('mongoose');
var express = require('express');

var Droit = require("../models/droit");

var droitController = {};



//Affiche un droit par rapport à son ID
droitController.show = function (req, res) {
    Droit.findOne({ _id: req.params.id }).exec(function (err, droit) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/droit/viewdetails", { droit: droit });
        }
    });
};


//--------------------------------------
//Lister les droits et les affiche dans l'index du Back office
//--------------------------------------
droitController.list = function (req, res) {
    Droit.find({}).exec(function (err, droits) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/droit/admin/index", { droits: droits });
        }
    });
};
//--------------------------------------
//Redirection vers la page de creation d'une droit
//--------------------------------------
droitController.create = function (req, res) {
    res.render("../views/droit/admin/create");
};
//--------------------------------------
// fonction de vérification des données vides
//--------------------------------------
 function verifChampsVide(champs){

    var condition =true ;
    for (var i = 0 ; i < champs.length ; i++){
        if ( champs[i] == "" ) {
            condition = false ;
        }
        }
        return condition

}
//------------------------------
//Enregistrement d'une droit
//------------------------------
droitController.save = function (req, res) {
    console.log(req.body);
    var droit = new Droit(req.body);
    var info = [req.body.level, 
        req.body.name]

//appel de la fonction verifChampsVide dans la variable verif

    var verif= verifChampsVide(info)
     
    res.redirect("/droits/admin");
        if (verif == true){ 

            droit.save(function (err) {
                if (err) {
                    console.log(err);
                    res.render("../views/droit/admin/create");
                } else {
                    console.log("creation droit OK");
                    res.redirect("/droits/admin");
                }
            });
    
        }else {
            res.render("../views/droit/admin/create");

        }
    
    

   

};


//--------------------------------------
//Edition d'un droit par son id
//--------------------------------------



droitController.edit = function (req, res) {
    var droit = new Droit(req.body);
    var verif= verifChampsVide(info);
    var info = [req.body.level, 
        req.body.name]


    if (verif == true){ 

    Droit.findOne({ _id: req.params.id }).exec(function (err, droit) {
        if (err) {
            console.log("Error ", err);
        } else {
            res.render("../views/droit/admin/edit", { droit: droit });
        }
    });
    }else{  res.render("../views/droit/admin/edit")


    }
};
//--------------------------------------
//Gestion de l'edition dun droit
//--------------------------------------

droitController.update = async function (req, res) {
    console.log(req.body);
    Droit.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.level,
            droitname: req.body.name
        }
    }, { new: true }, function (err, droit) {

        if (err) {
            console.log(err);
            res.render("../views/droit/admin/edit", { droit: req.body });
        }
        res.redirect("/droits/admin");

    });
};

//Export du module
module.exports = droitController;
