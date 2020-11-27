const express = require('express');

const veiculosController = require('../controllers/veiculosController');

function routes(Veiculo){
    const veiculoRouter = express.Router();

    const controller = veiculosController(Veiculo);

    /* GET, POST */
    veiculoRouter.route('/veiculos')
        .get(controller.get)
        .post(controller.post);

    veiculoRouter.use('/veiculos/:veiculoId', (request, response, next) => {
        Veiculo.findById(request.params.veiculoId, (error, veiculo) => {
            if (error) {
                return response.send(error);
            }
            if (veiculo) {
                request.veiculo = veiculo;
                return next();
            }
            return response.sendStatus(404);
        });
    });

    /* GET BY ID, PUT, PATCH, DELETE */
    veiculoRouter.route('/veiculos/:veiculoId')
        .get(controller.getById)
        .put(controller.put)
        .patch(controller.patch)
        .delete(controller.del)
    ;
        
    return veiculoRouter;
}

module.exports = routes;