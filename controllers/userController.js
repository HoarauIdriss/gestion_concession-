var mongoose = require('mongoose');
var express = require('express');

var User = require("../models/user");

var userController = {};


//--------------------------------------

// PARTIE FRONT

//---------------------------------------


//Affiche une user par rapport à son ID
userController.show = function (req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/user/viewdetails", { user: user });
        }
    });
};

//-----------------------------------------------------------------------

// PARTIE BACK

//-----------------------------------------------------------------------

//--------------------------------------
//Lister les users et les affiche dans l'index du Back office
//--------------------------------------
userController.list = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/user/admin/index", { users: users });
        }
    });
};
//--------------------------------------
//Redirection vers la page de creation d'une user
//--------------------------------------
userController.create = function (req, res) {
    res.render("../views/user/admin/createuser");
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
//Enregistrement d'une user
//------------------------------
userController.save = function (req, res) {
    console.log(req.body);
    var user = new User(req.body);
    var info = [req.body.email, 
        req.body.username, 
        req.body.password, 
        req.body.droit]

//appel de la fonction verifChampsVide dans la variable verif

    var verif= verifChampsVide(info)
     
   // res.redirect("/users/admin");
        if (verif == true){ 

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    res.render("../views/user/admin/create");
                } else {
                    console.log("creation user OK");
                    res.redirect("/users/admin");
                }
            });
    
        }else {
            res.render("../views/user/admin/create");

        }
    
    

   

};


//--------------------------------------
//Edition d'un user par son id
//--------------------------------------



userController.edit = function (req, res) {
    var user = new User(req.body);
   // var verif= verifChampsVide(info);
    var info = [req.body.email, 
        req.body.username, 
        req.body.password, 
        req.body.droit]
     var   verif = true;

    if (verif == true){ 

    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {
            console.log("Error ", err);
        } else {
            res.render("../views/user/admin/edit", { user: user });
        }
    });
    }else{  res.render("../views/user/admin/edit")


    }
};
//--------------------------------------
//Gestion de l'edition dun user
//--------------------------------------

userController.update = async function (req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            droit: req.body.droit
        }
    }, { new: true }, function (err, user) {

        if (err) {
            console.log(err);
            res.render("../views/user/admin/edit", { user: req.body });
        }
        res.redirect("/users/admin");

    });
};

//Export du module
module.exports = userController;
