const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Définition du plan (Schéma) de l'utilisateur
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'Le prénom est requis'] },
    lastName: { type: String, required: [true, 'Le nom de famille est requis'] },
    username: { type: String, required: [true, 'Le nom d\'utilisateur est requis'], unique: true },
    email: { type: String, required: [true, 'L\'email est requis'], unique: true },
    password: { type: String, required: [true, 'Le mot de passe est requis'] },
    phone: { type: String, required: [true, 'Le numéro de téléphone est requis'] },
    createdAt: { type: Date, default: Date.now }
});

// 2. Hachage automatique du mot de passe avant la sauvegarde en BDD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 3. Export du modèle pour l'utiliser dans le reste du projet
module.exports = mongoose.model('User', userSchema);