import categoryController from "../controller/category.controller"

describe('Categories tests', () => {
    const categoryCtrl = categoryController
    it ('GET /categories', async () => {
        const res = await categoryCtrl.getCategories()
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
    })
})