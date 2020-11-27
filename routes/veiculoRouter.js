const express = require('express');

function routes(Veiculo){
    const veiculoRouter = express.Router();
    /* GET, POST */
    veiculoRouter.route('/veiculos')
        .get((request, response) => {
            const query = {};
            if (request.query.vendido) {
                query.vendido = request.query.vendido;
            }

            Veiculo.find(query, (error, veiculos) => {
                if (error) {
                return response.send(error);
                }
                return response.json(veiculos);
            });
        })
        .post((request, response) => {
            const veiculo = new Veiculo(request.body);

            veiculo.save();
            return response.status(201).json(veiculo);
            })
            ;

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
        .get((request, response) => response.json(request.veiculo))
        .put((request, response) => {
            const { veiculo } = request;

            veiculo.veiculo = request.body.veiculo;
            veiculo.marca = request.body.marca;
            veiculo.ano = request.body.ano;
            veiculo.descricao = request.body.descricao;
            veiculo.vendido = request.body.vendido;
            veiculo.created = request.body.created;
            veiculo.updated = request.body.updated;

            request.veiculo.save((err) => {
                if (err) {
                    return response.send(err);
                }
                return response.json(veiculo);
            });
        })
        .patch((request, response) => {
            const { veiculo } = request;

            if (request.body._id) {
                delete request.body._id;
            }
            Object.entries(request.body).forEach( (item) => {
                const key = item[0];
                const value = item[1];
                veiculo[key] = value;
            });
            request.veiculo.save((err) => {
                if (err) {
                    return response.send(err);
                }
                return response.json(veiculo);
            });
        })
        .delete((request, response) => {
            request.veiculo.remove((err) => {
                if (err) {
                    return response.send(err);
                }
                return response.sendStatus(204);
            });
        });
    return veiculoRouter;
}

module.exports = routes;