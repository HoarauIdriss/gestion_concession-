var mongoose = require('mongoose');
var express = require('express');
var app = express();
var User = require("../models/user");


var userController = {};


//--------------------------------------------------------------------------------------------------------------------------------

// PARTIE AUTHENTIFICATION LOGIN 

//--------------------------------------------------------------------------------------------------------------------------------

// permet de se logger dans une session 
userController.login =  function (req,res){
    if (req.body.loginemail && req.body.loginpassword) {
        User.authenticate(req.body.loginemail, req.body.loginpassword, function (error, user) {
          if (error || !user) {
            var err = new Error('Mauvais email et/ou password.');
            err.status = 401;
            console.log('Error : ', err);
            res.redirect('/');
          } else {
            req.session.userId = user._id;
            console.log('req.session.userId 2: ', req.session.userId);
            res.redirect('/voitures/');
          }
        });
      } else {
        var err = new Error('champs requis.');
        err.status = 400;
        console.log('Error : ', err);
        res.redirect('/');
      }
}

// permet de se déconnecter de sa session
userController.logout = function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
          if (err) {
            console.log('Error : ', err);
            res.redirect('/voitures');
          } else {
            res.redirect('/');
          }
        });
      }
};


//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// PARTIE EDITION DES UTILISATEURS

//----------------------------------------------------------------------------------------------------------------------------------------------------------------



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

            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    res.render("../views/user/admin/create");
                } else {
                    req.session.userId = user._id;
                    console.log("creation user OK");
                    res.redirect("/users/admin");
                }
            });
    
        }else {
            res.render("../views/user/admin/create");

        }
    
    

   

};

//***************************************************************** */
// TO DO : afficher les détails des utilisateur dans une page 
//***************************************************************** */
// //Affiche une user par rapport à son ID
// userController.show = function (req, res) {
//     User.findOne({ _id: req.params.id }).exec(function (err, user) {
//         if (err) {
//             console.log('Error : ', err);
//         } else {
//             res.render("../views/user/viewdetails", { user: user });
//         }
//     });
// };

//******************************************************************* */



//************************************************************************* */
//  TO DO : finir la partie édition des données utilisateurs  

//************************************************************************ */


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


//************************************************************************* */
//
//************************************************************************ */

//Export du module
module.exports = userController;
