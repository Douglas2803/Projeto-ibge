
import pool from '../database';
import { RowDataPacket } from 'mysql2';
import { Municipio } from '../models/Municipio';

class MunicipioDAO {
  async findByNome(nome: string): Promise<Municipio | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE nome_municipio = ?', [nome]);
    return rows[0] as Municipio || null;
  }

  async getPopulacaoByEstado(estado: string): Promise<number | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT SUM(populacao) as total FROM municipios WHERE estado = ?', [estado]);
    return rows[0]?.total || null;
  }

  async listCapitais(): Promise<Municipio[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE capital = 1'); // Em MySQL, 1 para true
    return rows as Municipio[];
  }

  async listMunicipiosByPopulacao(min: number, max?: number): Promise<Municipio[]> {
    if (max) {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE populacao BETWEEN ? AND ?', [min, max]);
      return rows as Municipio[];
    } else {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE populacao > ?', [min]);
      return rows as Municipio[];
    }
  }

  async getEstadosOndeCapitalNaoEMaisPopulosa(): Promise<{ estado: string; cidade_mais_populosa: string; populacao: number }[]> {
    const query = `
      WITH CidadesMaisPopulosas AS (
        SELECT estado, MAX(populacao) as max_populacao
        FROM municipios
        GROUP BY estado
      ),
      Capitais AS (
        SELECT estado, populacao
        FROM municipios
        WHERE capital = true
      )
      SELECT m.estado, m.nome_municipio as cidade_mais_populosa, m.populacao
      FROM municipios m
      JOIN CidadesMaisPopulosas cmp ON m.estado = cmp.estado AND m.populacao = cmp.max_populacao
      LEFT JOIN Capitais c ON m.estado = c.estado
      WHERE c.populacao IS NULL OR c.populacao < cmp.max_populacao;
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as { estado: string; cidade_mais_populosa: string; populacao: number }[];
  }

  async getDezMunicipiosMaisPopulososNaoCapitais(): Promise<Municipio[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE capital = 0 ORDER BY populacao DESC LIMIT 10'); // Em MySQL, 0 para false
    return rows as Municipio[];
  }
}

export default new MunicipioDAO();
