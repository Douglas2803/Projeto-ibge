
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

  async listMunicipiosByPopulacao(min: number, max?: number) {
    const municipios = await MunicipioRepository.listMunicipiosByPopulacao(min, max);
    const formattedMunicipios = municipios.map(m => ({
      nome_municipio: m.nome_municipio,
      estado: m.estado,
      populacao: m.populacao
    }));
    return {
      quantidade: formattedMunicipios.length,
      municipios: formattedMunicipios
    };
  }

  getEstadosOndeCapitalNaoEMaisPopulosa() {
    return MunicipioRepository.getEstadosOndeCapitalNaoEMaisPopulosa();
  }

  getDezMunicipiosMaisPopulososNaoCapitais() {
    return MunicipioRepository.getDezMunicipiosMaisPopulososNaoCapitais();
  }
}

export default new MunicipioService();
