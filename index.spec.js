const request = require('supertest')
const app = require('./server2')

describe('Testando get', ()=>{
    it('Deve retornar o statusCode 200 do get', async() =>{
        const res = await request(app).get('/desenvolvedor')
        //console.log(res)
        expect(res.statusCode).toEqual(200)
    })
})

describe('Testando post', ()=>{
    it('Deve retornar o StatusCode 201 do post', async() =>{
        const res = await request(app).post('/desenvolvedor').send({
            nome: 'teste',
            sexo: 'H',
            idade: '01',
            hobby: 'testeteste',
            dt_nascimento: '1000-01-01'
            })
        expect(res.statusCode).toEqual(201)
        })
    })

    describe('Testando delete', ()=>{
        it('Deve retornar o statusCode 202 do delete', async() =>{
            const res = await request(app).delete('/desenvolvedor/15')
            //console.log(res)
            expect(res.statusCode).toEqual(202)
        })
    })
  
    describe('Testando put', ()=>{
        it('Deve retornar o StatusCode 202 do put', async() =>{
            const res = await request(app).put('/desenvolvedor/16').send({
                nome: 'testeatu',
                sexo: 'H',
                idade: '01',
                hobby: 'testeteste',
                dt_nascimento: '1000-01-01'
                })
            expect(res.statusCode).toEqual(202)
            })
        })

