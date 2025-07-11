import pool from '../database';
import { RowDataPacket } from 'mysql2';
import { Municipio } from '../models/Municipio';

class MunicipioDAO {
  async findByNome(nome: string): Promise<Municipio | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE Nome_Municipio = ?', [nome]);
    return rows[0] as Municipio || null;
  }

  async getPopulacaoByEstado(estado: string): Promise<number | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT SUM(populacao) as total FROM municipios WHERE UF = ?', [estado]);
    return rows[0]?.total || null;
  }

  async listCapitais(): Promise<Municipio[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE Capital_Estado = 1'); // Em MySQL, 1 para true
    return rows as Municipio[];
  }

  async listMunicipiosByPopulacao(min: number, max?: number): Promise<Municipio[]> {
    if (max) {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT id, UF AS estado, codigo_estado, codigo_municipio, Nome_Municipio AS nome_municipio, Capital_Estado AS capital, Populacao AS populacao FROM municipios WHERE Populacao BETWEEN ? AND ?', [min, max]);
      return rows as Municipio[];
    } else {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT id, UF AS estado, codigo_estado, codigo_municipio, Nome_Municipio AS nome_municipio, Capital_Estado AS capital, Populacao AS populacao FROM municipios WHERE Populacao > ?', [min]);
      return rows as Municipio[];
    }
  }

  async getEstadosOndeCapitalNaoEMaisPopulosa(): Promise<{ estado: string; cidade_mais_populosa: string; populacao: number }[]> {
    const query = `
      WITH CidadesMaisPopulosas AS (
        SELECT UF, MAX(Populacao) as max_populacao
        FROM municipios
        GROUP BY UF
      ),
      Capitais AS (
        SELECT UF, Populacao
        FROM municipios
        WHERE Capital_Estado = 1
      )
      SELECT m.UF, m.nome_municipio as cidade_mais_populosa, m.Populacao
      FROM municipios m
      JOIN CidadesMaisPopulosas cmp ON m.UF = cmp.UF AND m.Populacao = cmp.max_populacao
      LEFT JOIN Capitais c ON m.UF = c.UF
      WHERE c.Populacao IS NULL OR c.Populacao < cmp.max_populacao;
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as { estado: string; cidade_mais_populosa: string; populacao: number }[];
  }

  async getDezMunicipiosMaisPopulososNaoCapitais(): Promise<Municipio[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM municipios WHERE Capital_Estado = 0 ORDER BY Populacao DESC LIMIT 10'); // Em MySQL, 0 para false
    return rows as Municipio[];
  }
}

export default new MunicipioDAO();