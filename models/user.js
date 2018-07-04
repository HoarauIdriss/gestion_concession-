var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
  
/**
 * Création du modèle pour la base de données pour la collections "voitures"
 */
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    droit: {
        type: String, 
        ref:'droit'
    }
  });

//hashing a password before saving it to the database
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

var User = mongoose.model('user', UserSchema);

module.exports = User;