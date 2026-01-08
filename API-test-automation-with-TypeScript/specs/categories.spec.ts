import authenticationController from "../controller/authentication.controller"
import categoryController from "../controller/category.controller"
import config from '../config/base.config'

describe('Categories tests', () => {
    const categoryCtrl = categoryController
    const auth = authenticationController
    let token: string

    beforeAll(async () => {
        const beareToken = await auth.login({ 'email': config.email, 'password': config.password })
        token = beareToken.body.token
        console.log(token)
    })

    it ('GET /categories', async () => {
        const res = await categoryCtrl.getCategories()
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
    })

    describe('Create category', () => {
        it ('POST /categories - success', async () => {
            const name = "Test Category " + Math.floor(Math.random() * 100000)
            const playload = {
                'name': name
            }
            const res = await categoryCtrl.postCategory(playload, token)
            console.log(res.body)
            expect(res.status).toBe(200)
        })
    })
})