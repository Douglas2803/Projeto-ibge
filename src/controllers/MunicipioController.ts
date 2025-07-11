import { Request, Response } from 'express';
import MunicipioService from '../services/MunicipioService';

class MunicipioController {
  findByNome = async (req: Request, res: Response) => {
    const { nome } = req.query;
    const municipio = await MunicipioService.findByNome(nome as string);
    res.json(municipio);
  }

  getPopulacaoByEstado = async (req: Request, res: Response) => {
    const { uf } = req.params;
    const populacao = await MunicipioService.getPopulacaoByEstado(uf);
    res.json({ estado: uf, populacao });
  }

  listCapitais = async (req: Request, res: Response) => {
    const capitais = await MunicipioService.listCapitais();
    res.json(capitais);
  }

  listMunicipiosByPopulacao = async (req: Request, res: Response) => {
    const { acima, min, max } = req.query;
    if (acima) {
      const result = await MunicipioService.listMunicipiosByPopulacao(Number(acima));
      return res.json(result);
    }
    if (min && max) {
      const result = await MunicipioService.listMunicipiosByPopulacao(Number(min), Number(max));
      return res.json(result);
    }
    res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  getEstadosOndeCapitalNaoEMaisPopulosa = async (req: Request, res: Response) => {
    const estados = await MunicipioService.getEstadosOndeCapitalNaoEMaisPopulosa();
    res.json(estados);
  }

  getDezMunicipiosMaisPopulososNaoCapitais = async (req: Request, res: Response) => {
    const municipios = await MunicipioService.getDezMunicipiosMaisPopulososNaoCapitais();
    res.json(municipios);
  }
}

export default new MunicipioController();