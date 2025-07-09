
import { Municipio } from '../models/Municipio';

export interface IMunicipioRepository {
  findByNome(nome: string): Promise<Municipio | null>;
  getPopulacaoByEstado(estado: string): Promise<number | null>;
  listCapitais(): Promise<Municipio[]>;
  listMunicipiosByPopulacao(min: number, max?: number): Promise<Municipio[]>;
  getEstadosOndeCapitalNaoEMaisPopulosa(): Promise<{ estado: string; cidade_mais_populosa: string; populacao: number }[]>;
  getDezMunicipiosMaisPopulososNaoCapitais(): Promise<Municipio[]>;
}
