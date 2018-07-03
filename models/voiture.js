var mongoose = require('mongoose');
/**
 * Création du modèle pour la base de données pour la collections "voitures"
 */
var VoitureSchema = new mongoose.Schema({
    marque: String,
    modele: String,
    image: String,
    puissance: String,
    motorisation: String,
    prix: Number,
    couleur: String,
    portes: Number,
    places: Number,
    actif: String
});

module.exports = mongoose.model("voitures", VoitureSchema);