var mongoose = require('mongoose');
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
  var User = mongoose.model('user', UserSchema);
  module.exports = User;