import db from "../config/connectDB.js";

// CREATION NOUVEL UTILISATEUR
export const createUser = async (username, email, password_hash) => {
    const [result] = await db.query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, password_hash]
    );
    return result.insertId;
}

// TROUVER UNE TACHE VIA USER_ID (réponse format tableau)
export const findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    // SI PAS DE REPONSE AFFICHE NULL
    return rows[0] || null;
}


