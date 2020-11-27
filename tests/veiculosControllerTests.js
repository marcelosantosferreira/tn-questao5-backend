const should = require('should');
const sinon = require('sinon');
const veiculosController = require('../controllers/veiculosController');

describe('Testando o controller veiculosController', () => {

    describe('POST', ()=> {
        it('should not allow empty field veiculo on post', () => {
            //mocking the save method
            const Veiculo = function (veiculo){
                this.save = () => {}
            }
            //mocking the request (with no 'veiculo')
            const request = {
                body: {
                    marca: 'Ford'
                }
            }
            //mocking the response as well (using spy to track calls)
            const response = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }

            const controller = veiculosController(Veiculo);
            controller.post(request, response);

            // when 'veiculo' is empty the api should return a code 400 (bad request)
            response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`);
            response.send.calledWith('Veiculo precisa ser preenchido').should.equal(true);
        });
    });

    //TODO: unit test for remaining verbs
});