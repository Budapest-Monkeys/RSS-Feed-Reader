const { response } = require('express')
const request = require('supertest')
const app = require('./routes/testAPI')

describe('GET /test ', () => {
    describe("Basic JSON has been returned.", () => {
        it('Should respond with 200 status code', () => {
            request(app)
            .get('/test')
            .expect('Content-Type', /json/)
            .expect(200)
        })
    })
})
describe('POST /test ', () => {
    describe("Basic JSON of RSS feed has been returned.", () => {
        it('Should respond with 200 status code', () => {
            request(app)
            .post('/test')
            .send({
                url: "https://mattandshanessecret.libsyn.com/rss"
            })
            .expect('Content-Type', /json/)
            .expect(200)
        })
    })
})
describe('Error handler test', () => {
    describe("Basic test to see if error handling returns error code in correct JSON format", () => {
        it('Should respond with 404', () => {
            request(app)
            .get('/')
            .expect('Conent-Type', /json/)
            .expect(200)
        })
    })
})

describe('POST /test 400  error handler test', () => {
    describe("Basic test to see if error handling returns error code in correct JSON format", () => {
        it('Should respond with 400', () => {
            request(app)
            .get('/')
            .expect('Conent-Type', /json/)
            .expect(400)
        })
    })
})