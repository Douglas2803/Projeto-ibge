
import { Municipio } from '../models/Municipio';
import { IMunicipioRepository } from './IMunicipioRepository';
import MunicipioDAO from '../daos/MunicipioDAO';

class MunicipioRepository implements IMunicipioRepository {
  findByNome(nome: string): Promise<Municipio | null> {
    return MunicipioDAO.findByNome(nome);
  }

  getPopulacaoByEstado(estado: string): Promise<number | null> {
    return MunicipioDAO.getPopulacaoByEstado(estado);
  }

  listCapitais(): Promise<Municipio[]> {
    return MunicipioDAO.listCapitais();
  }

  listMunicipiosByPopulacao(min: number, max?: number): Promise<Municipio[]> {
    return MunicipioDAO.listMunicipiosByPopulacao(min, max);
  }

  getEstadosOndeCapitalNaoEMaisPopulosa(): Promise<{ estado: string; cidade_mais_populosa: string; populacao: number }[]> {
    return MunicipioDAO.getEstadosOndeCapitalNaoEMaisPopulosa();
  }

  getDezMunicipiosMaisPopulososNaoCapitais(): Promise<Municipio[]> {
    return MunicipioDAO.getDezMunicipiosMaisPopulososNaoCapitais();
  }
}

export default new MunicipioRepository();
