var mongoose = require('mongoose');

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