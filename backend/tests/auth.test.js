const request = require('supertest');
const app = require('../server'); // Importa o app

describe('Testes de Autenticação', () => {
    it('Deve registrar um novo usuário', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Fulano',
                email: 'fulano@example.com',
                password: 'senha123',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('Deve falhar ao registrar com e-mail inválido', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Fulano',
                email: 'fulano', // E-mail inválido
                password: 'senha123',
            });
        expect(res.statusCode).toEqual(400);
    });
});
