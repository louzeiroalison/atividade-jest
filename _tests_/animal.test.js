const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');
const fs = require('fs');

describe('Cadastro de Animais (POST)', () => {
    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('cadastro com sucesso', async () => {
        const resposta = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
        expect(resposta.status).toBe(201);//sucesso
    });

    it('cadastro com idade invalida', async () => {
        const resposta = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
        expect(resposta.status).toBe(400);//falha
    });

    it('cadastro com nome pequeno', async () => {
        const resposta = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
        expect(resposta.status).toBe(400);//falha
    });

    
});

describe('Retorno da Lista de Animais (GET)', () => {

    beforeAll(() => {
        animalsData.push({
            'id': '1',
            'nome': 'Spike',
            'especie': 'Cachorro',
            'idade': 10
        });
        animalsData.push({
            'id': '2',
            'nome': 'Mimi',
            'especie': 'Gato',
            'idade': 4
        });
        animalsData.push({
            'id': '3',
            'nome': 'J',
            'especie': 'Hamster',
            'idade': 1
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('retorno de lista de todos os animais cadastrados', async () => {
        const resposta = await request(app).get('/animais');
        expect(resposta.status).toBe(200);
        expect(resposta.body.length).toBe(3);
        
    });
})