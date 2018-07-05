## Création du login && de l'authentification*

Techno principal :
-Node.js
-Express (JS framework)
-MongoDB (Database)

Les "outils" utilisées (ont été chargé dans le fichier app.js) :

- body-parser (for parsing incoming requests)
- mongoose (pour gérer les données de mongo DB sous forme de modèle )
- bcrypt (pour "hasher" le mot de passe de l'utilisateur dans l'affichage de la base de donnée) :

- express session (pour gérer les sessions ) qui s'utilise pour le suivi des connexions : 

app.use (session ({ 
  secret: 'No pain no gain', 
  resave: true, 
  saveUninitialized: false 
})); 


1. créer le schéma de la base de donnée "user " dans un fichier .js dans le dossier "models"

2. mettre en place les formulaires en partie front (pour pouvoir  récuperer les données et les ajouter dans la base de donnéee)

3. paramétrer dans le fichier userController les fonctions qui permettra de se logger et de se déconnecter

3. dans le fichier "users.js" dans le dossier "routes" mettre en place les routes  de login et logout

4. ajouter un hashing de mot de passe dans user.js du dossier models qui permettra de hasher le mot de passe avant de l'enregistrer dans la base de donnée

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

5. vérifier que les donnée entrer dans les input du formulaire login correspondent bien aux donnée de login de la base de donnée (exemple ci-dessous sinon voir /routes/user.js partie authentification)

UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
