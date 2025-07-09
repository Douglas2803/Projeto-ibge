
import { Router } from 'express';
import MunicipioController from '../controllers/MunicipioController';

const router = Router();

router.get('/municipios', MunicipioController.findByNome);
router.get('/estados/:uf/populacao', MunicipioController.getPopulacaoByEstado);
router.get('/capitais', MunicipioController.listCapitais);
router.get('/municipios/populacao', MunicipioController.listMunicipiosByPopulacao);
router.get('/estados/capital-nao-mais-populosa', MunicipioController.getEstadosOndeCapitalNaoEMaisPopulosa);
router.get('/municipios/mais-populosos-nao-capitais', MunicipioController.getDezMunicipiosMaisPopulososNaoCapitais);

export default router;
