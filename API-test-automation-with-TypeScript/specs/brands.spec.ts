
import BrandController from '../controller/brand.controller'

describe('Brands tests', () => {
    const brandController = BrandController
    let postBrand: any
    beforeAll(async () => {
        const payload = {
            'name': "Test Brand " + Math.floor(Math.random() * 1000),
            'description': "Testing creating a new entry"
        }
        const res = await brandController.postBrand(payload)
        postBrand = res.body
    })
    afterAll(async () => {
        await brandController.deleteBrandById(postBrand._id)
    })
    describe('Fetch Brands', () => {
        it('GET /brands', async () => {
            const res = await brandController.getBrands()
            expect(res.status).toBe(200)
            expect(res.body.length).toBeGreaterThan(0)
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
        })
    })
    describe('Create Brand', () => {
        it('POST /brand/', async () => {
            const payload = {
                'name': "Test Brand " + Math.floor(Math.random() * 100000),
                'description': "Testing creating a new entry"
            }
            const res = await brandController.postBrand(payload)
            expect(res.status).toBe(200)
            expect(res.body.name).toBe(payload.name)
            expect(res.body).toHaveProperty('createdAt')
        })
    })
    describe('Fetch Individual Brand', () => {
        it('GET /brand/:id', async () => {
            const res = await brandController.getBrandById(postBrand._id)
            expect(res.status).toBe(200)
            console.log("printing the response body")
            console.log(res.body)
            expect(res.body.name).toBe(postBrand.name)
        })
    })
    describe('Schema validations', () => {
        it('Schema Verification - Name is mandatory field', async () => {
            const payload = {
                'name': "",
                'description': "Testing description"
            }
            const res = await brandController.postBrand(payload)
            console.log(res.body)
            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual("Name is required")
        })
        it('Schema Verification - Min Char length for name > 1', async () => {
            const payload = {
                'name': "a",
                'description': "Testing description"
            }
            const res = await brandController.postBrand(payload)
            console.log(res.body)
            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual("Brand name is too short")
        })
        it('Schema Verification - Brand name > 30 chars is not allowed', async () => {
            const payload = {
                'name': "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE",
                'description': "Testing description"
            }
            const res = await brandController.postBrand(payload)
            console.log(res.body)
            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual("Brand name is too long")
        })
        it('Schema Verification - Brand description must be string', async () => {
            const payload = {
                'name': `Test Brand ` + Math.floor(Math.random() * 1000),
                'description': 1
            }
            const res = await brandController.postBrand(payload)
            console.log(res.body)
            expect(res.statusCode).toBe(422)
            expect(res.body.error).toEqual("Brand description must be a string")
        })
    })
    describe('Business Logic Validations', () => {
        it('Business logic - Duplicated brand name is not allowed', async () => {
            const payload = {
                'name': postBrand.name,
                'description': "Testing creating a new entry"
            }
            // Second attempt to create another brand with the same name
            const res2 = await brandController.postBrand(payload)
            console.log(res2.body)
            expect(res2.status).toBe(422)
            let errorRes = res2.body.error.split(" ")
            expect(errorRes.slice(0, 2).join(" ")).toContain("Test Brand")
            expect(errorRes.slice(-2).join(" ")).toContain("already exists")
        })
        it('Business logic - GET /brand/invalid_id return 404', async () => {
            const res = await brandController.getBrandById('6485f0f0f0f0f0f0f0f0f0f0')
            console.log(res.body)
            expect(res.status).toBe(404)
            expect(res.body.error).toContain("Brand not found")          
        })
        it('Business logic - PUT /brand/invalid_brand_id error', async () => {
            // First create a brand with unique name to be reused
            const payload = {
                'name': postBrand.name,
                'description': "Testing update a duplicated entry"
            }
            // Second attempt to update a brand with an invalid id
            const res2 = await brandController.putBrandById('6485f0f0f0f0f0f0f0f0f0f0', payload)
            console.log(res2.body)
            expect(res2.status).toBe(404)
            expect(res2.body.error).toContain("Brand not found")          
        })
    })

    describe('Update Brand', () => {
        it('PUT /brand/:id', async () => {
            const payload = {
                name: postBrand.name,
                description: "Testing updating an existing entry"
            }
            const res = await brandController.putBrandById(postBrand._id, payload)

            expect(res.status).toBe(200)
            expect(res.body.name).toBe(postBrand.name)
            expect(res.body.description).toBe('Testing updating an existing entry')
            expect(res.body).toHaveProperty('updatedAt')
        })
    })
    describe('Delete Brand', () => {
        let deleteBrand: any
        beforeAll(async () => {
            const payload = {
                'name': "Test Brand " + Math.floor(Math.random() * 1000),
                'description': "Testing creating a new entry"
            }
            const res = await brandController.postBrand(payload)
            deleteBrand = res.body
        })
        it ('DELETE /brand/:id', async () => {
            const res = await brandController.deleteBrandById(deleteBrand._id)
            expect(res.status).toBe(200)
        })
        it ('DELETE /brand/invalid_id error', async () => {
            const res = await brandController.deleteBrandById('6485f0f0f0f0f0f0f0f0f0f0')
            expect(res.status).toBe(404)
        })
    })
})