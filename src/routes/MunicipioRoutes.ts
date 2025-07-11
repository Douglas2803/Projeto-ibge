
import { Router } from 'express';
import municipioController from '../controllers/MunicipioController';

const router = Router();

router.get('/municipios', municipioController.findByNome);
router.get('/estados/:uf/populacao', municipioController.getPopulacaoByEstado);
router.get('/capitais', municipioController.listCapitais);
router.get('/municipios/populacao', municipioController.listMunicipiosByPopulacao);
router.get('/estados/capital-nao-mais-populosa', municipioController.getEstadosOndeCapitalNaoEMaisPopulosa);
router.get('/municipios/mais-populosos-nao-capitais', municipioController.getDezMunicipiosMaisPopulososNaoCapitais);

export default router;
