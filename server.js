// ================================================================================
//                  SERVEUR EXPRESS — VERSION PROPRE & FONCTIONNELLE
// ================================================================================

import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { fileURLToPath } from "node:url";
import path from "node:path";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoute.js";
import taskRoutes from "./src/routes/taskRoute.js";

// ----------------- Initialisation --------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ----------------- CORS -------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ----------------- Helmet (CSP corrigé) ---------------------------------

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        connectSrc: ["'self'", "http://localhost:3000"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ----------------- Middlewares globaux ---------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ----------------- Routes API -------------------------------------------

app.use("/users", authRoutes);
app.use("/tasks", taskRoutes);

// ----------------- Routes Front -----------------------------------------

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/register.html"));
});

app.get("/login", (_req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/login.html"));
});

app.get("/list", (_req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/tasklist.html"));
});

// ----------------- Démarrage serveur ------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
