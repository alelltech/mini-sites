#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Para qualquer rota não encontrada, servir index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos de ${path.join(__dirname, 'dist')}`);
});
