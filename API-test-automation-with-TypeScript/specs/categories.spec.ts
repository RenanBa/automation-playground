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
        let categoryToDelete: any
        afterAll(async () => {
            await categoryCtrl.deleteCategoryById(categoryToDelete._id, token)
        })

        it ('POST /categories - success', async () => {
            const name = "Test Category " + Math.floor(Math.random() * 100000)
            const playload = {
                'name': name
            }
            const res = await categoryCtrl.postCategory(playload, token)
            console.log(res.body)
            expect(res.status).toBe(200)
            categoryToDelete = res.body
        })
    })

    describe('Update category', () => {
        let newCategory: any
        beforeAll(async () => {
            const name = "Test Category " + Math.floor(Math.random() * 100000)
            const playload = {
                'name': name
            }
            const newCat = await categoryCtrl.postCategory(playload, token)
            newCategory = newCat.body
        })

        afterAll(async () => {
            await categoryCtrl.deleteCategoryById(newCategory._id, token)
        })

        it ('PUT /categories/:id - success', async () => {
            const playload = {
                'name': 'New category name' + Math.floor(Math.random() * 100000)
            }
            const updatedCategory = await categoryCtrl.putCategoryById(newCategory._id, playload, token)
            console.log(updatedCategory.body)
            expect (updatedCategory.status).toBe(200)
            expect (updatedCategory.body.name).toBe(playload.name)
        })
    })

    describe('Delete category', () => {
        let categoryToDelete: any
        beforeAll(async () => {
            const name = "Test Category " + Math.floor(Math.random() * 100000)
            const playload = {
                'name': name
            }
            const newCat = await categoryCtrl.postCategory(playload, token)
            categoryToDelete = newCat.body
        })

        afterAll(async () => {
            try {
                await categoryCtrl.deleteCategoryById(categoryToDelete._id, token)
            } catch (error) {
                console.log(`Category already deleted: ${categoryToDelete._id}`)
            }
        })

        it ('DELETE /categories/:id - success', async () => {
            const res = await categoryCtrl.deleteCategoryById(categoryToDelete._id, token)
            expect(res.status).toBe(200)
        })
    })
})