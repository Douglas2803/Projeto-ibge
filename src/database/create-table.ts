import pool from './index';

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS municipios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estado VARCHAR(255) NOT NULL,
        codigo_estado INT NOT NULL,
        codigo_municipio INT NOT NULL,
        nome_municipio VARCHAR(255) NOT NULL,
        capital BOOLEAN NOT NULL,
        populacao INT NOT NULL
      )
    `);
    console.log('Table municipios created or already exists.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
}

createTable();
