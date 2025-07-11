// src/app.ts

import express from "express";
import MunicipioRoutes from "./routes/MunicipioRoutes";
import path from "path"; // Importe o módulo 'path' do Node.js

const app = express();

// Adicione esta linha para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use("/api", MunicipioRoutes);

export default app;
