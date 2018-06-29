var mongoose = require('mongoose');

var VoitureSchema = new mongoose.Schema({
    marques: String,
    modèle: String,
    image: String,
    puissance: String,
    motorisation: String,
    prix: Number,
    couleur: String,
    portes: Number,
    places: Number
});

module.exports = mongoose.model("voitures", VoitureSchema);