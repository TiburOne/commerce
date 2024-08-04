import { fileURLToPath } from 'url';
import path from 'path';
import { Sequelize } from 'sequelize';
import fs from 'fs/promises';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Construir la URL del archivo JSON
const configPath = new URL('../config/config.json', import.meta.url);
const configRaw = await fs.readFile(configPath, 'utf8');
const configFile = JSON.parse(configRaw)[env];

// Configuración de Sequelize desde variables de entorno o config.json
let sequelize;
if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASS && process.env.DB_HOST) {
  console.log("VARIABLES DE CONFIGURACION => ");
  console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, process.env);
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT || 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: process.env.DB_LOGGING === 'true',
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
          require: true,
          rejectUnauthorized: false
        } : false,
      },
    }
  );
} else {
  console.log("SIN VARIABLES DE CONFIGURACION");
  sequelize = new Sequelize(configFile.database, configFile.username, configFile.password, configFile);
}

const files = await fs.readdir(__dirname);
for (const file of files) {
  if (file.indexOf('.') !== 0 && file !== basename && file.slice(-4) === '.mjs' && file.indexOf('.test.js') === -1) {
    // Construir la URL del archivo para importación dinámica
    const modelPath = new URL(file, import.meta.url);
    const { default: model } = await import(modelPath);
    const aux = model(sequelize, Sequelize.DataTypes);
    db[aux.name] = aux;
  }
}

Object.keys(db).forEach(async modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
