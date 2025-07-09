
import MunicipioRepository from '../repositories/MunicipioRepository';

class MunicipioService {
  findByNome(nome: string) {
    return MunicipioRepository.findByNome(nome);
  }

  getPopulacaoByEstado(estado: string) {
    return MunicipioRepository.getPopulacaoByEstado(estado);
  }

  listCapitais() {
    return MunicipioRepository.listCapitais();
  }

  listMunicipiosByPopulacao(min: number, max?: number) {
    return MunicipioRepository.listMunicipiosByPopulacao(min, max);
  }

  getEstadosOndeCapitalNaoEMaisPopulosa() {
    return MunicipioRepository.getEstadosOndeCapitalNaoEMaisPopulosa();
  }

  getDezMunicipiosMaisPopulososNaoCapitais() {
    return MunicipioRepository.getDezMunicipiosMaisPopulososNaoCapitais();
  }
}

export default new MunicipioService();
