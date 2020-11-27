function veiculosController(Veiculo){

    function get(request, response) {
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
    }

    function post (request, response){
        const veiculo = new Veiculo(request.body);
        //TODO: incrementar validações
        if (!request.body.veiculo) {
            response.status(400);
            return response.send('Veiculo precisa ser preenchido');
        }
        veiculo.save();
        response.status(201);
        return response.json(veiculo);
    }

    function put (request, response) {
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
    }

    function patch(request, response) {
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
    }

    function del(request, response){
        request.veiculo.remove((err) => {
            if (err) {
                return response.send(err);
            }
            return response.sendStatus(204);
        });
    }

    function getById(request, response) {
        return response.json(request.veiculo);
    }
    
    return {get, post, put, patch, del, getById};
}
module.exports = veiculosController;