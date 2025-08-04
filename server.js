import 'dotenv/config';

import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

/**
 * @description Servidor que captura y responde a todas las peticiones HTTP.
 *              Responde con un JSON cargado desde un archivo local.
 */
app.get(`${process.env.GET_ROUTE}/:variable`, (req, res) => {
  console.log(`--- Simulando petición con variable: ${req.params.variable} ---`);
  try {

    // Carga inicial del archivo JSON
    const catalogData = JSON.parse(
      readFileSync(join(__dirname, `${process.env.FILENAME}.json`), 'utf8')
    );

    res.status(200).json({ item: catalogData });
  } catch (error) {
    console.error('Error al procesar la petición:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @description Ruta que captura todas las peticiones HTTP y responde con un mensaje de OK.
 */
app.all(`${process.env.ALL_ROUTE}`, (req, res) => {
  try {
    console.log('--- New Request Received ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    res.status(200).json({
      message: 'OK'
    });
  } catch (error) {
    console.error('Error al procesar la petición:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @description Inicia el servidor en el puerto especificado.
 */
app.listen(port, () => {
  console.log(`Capture server listening at http://localhost:${port}`);
});
