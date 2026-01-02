import categoryController from "../controller/category.controller"
import config from '../config/base.config'
import TestHelper from "../utils/helper"

describe('Categories tests', () => {
    const categoryCtrl = categoryController
    const testHelper = TestHelper

    let token: string

    beforeAll(async () => {
        token = await testHelper.login(config.email, config.password)
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
            const res = await testHelper.createCategory(token)
            console.log(res.body)
            expect(res.status).toBe(200)
            categoryToDelete = res.body
        })
    })

    describe('Update category', () => {
        let newCategory: any
        beforeAll(async () => {
            const res = await testHelper.createCategory(token)
            newCategory = res.body
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
            const res = await testHelper.createCategory(token)
            categoryToDelete = res.body
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