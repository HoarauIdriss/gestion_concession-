var mongoose = require('mongoose');
/**
 * Création du modèle pour la base de données pour la collections "voitures"
 */
var DroitSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
  });
  var Droit = mongoose.model('droit', DroitSchema);
  module.exports = Droit;