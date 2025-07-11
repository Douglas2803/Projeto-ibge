
import fs from 'fs';
import path from 'path';
import pool from '../src/database';

async function loadData() {
  const filePath = path.join(__dirname, '../2022_IBGE-Municipios.csv');
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const lines = fileContent.split('\n');

  for (const line of lines) {
    const [estado, codigo_estado, codigo_municipio, nome_municipio, capital, populacao] = line.split(',');

    // Pule o cabeçalho ou linhas malformadas
    if (!estado || !codigo_estado || !codigo_municipio || !nome_municipio || !capital || !populacao) {
      continue;
    }

    await pool.query(
      'INSERT INTO municipios (estado, codigo_estado, codigo_municipio, nome_municipio, capital, populacao) VALUES ($1, $2, $3, $4, $5, $6)',
      [estado, Number(codigo_estado), Number(codigo_municipio), nome_municipio, capital.toLowerCase() === 'sim', Number(populacao)]
    );
  }

  console.log('Dados carregados com sucesso!');
  pool.end();
}

loadData();
