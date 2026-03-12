import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token =
        // ? verif existence 
        req.cookies?.token ??
        // a vérifier
        req.headers.authorization?.split(' ')[1];

    // si pas de token
    if (!token) {
        return res.status(401).json({ error: " Erreur d'authentification" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch {
        return res.status(401).json({ error: 'token invalide ou expiré' });
    }
};

export default auth;