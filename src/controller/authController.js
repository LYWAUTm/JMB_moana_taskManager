import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createUser, findByEmail } from "../models/UserModel.js";
import { response } from "express";

// ======================================================================================
//                          AUTH CONTROLLER REGISTER
// ======================================================================================

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // VERIFICATION DES CHAMPS VIDES
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // VERIFICATION MOT DE PASSE > 12 CHARACTERES
    if (password.length < 12) {
        return res.status(400).json({ message: "Votre mot de passe doit contenir au moins 12 caractères" });
    }

    // VERIFICATION EMAIL UNIQUE
    try {
        const exists = await findByEmail(email);
        if (exists) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // HASH DU MOT DE PASSE AVEC Argon2
        const hash = await argon2.hash(password);

        // CREATION UTILISATEUR VIA / RETOUR REPONSE EN JSON
        await createUser(username, email, hash);
        return res.json({ message: "Utilisateur créé" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


// =======================================================================================
//                          LOGIN
// =======================================================================================

// OPTIONS DU COOKIE
const cookie_opts = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 36000000,
};

// CREATION PAYLOAD
const signToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Identifiants invalides" });
        }
        // ARGON 2
        const valid = await argon2.verify(user.password_hash, password);
        if (!valid) {
            return res.status(400).json({ message: "Identifiants invalides" });
        }

        // TOKEN / CREATION COOKIE
        const token = signToken({ id: user.id, username: user.username, email: user.email });
        res.cookie('token', token, cookie_opts);

        return res.status(200).json({ message: "Connecté", token: token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const logOut = (_req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ message: "Déconnecté" });
}
