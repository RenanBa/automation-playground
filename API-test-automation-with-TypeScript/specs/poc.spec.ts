import * as supertest from 'supertest'
const request = supertest('https://jsonplaceholder.typicode.com')

describe('POC Tests', () => {
    it('GET /posts', async () => {
        const res = await request.get('/posts')
        expect(res.status).toBe(200)
        console.log(res)
    })
})
