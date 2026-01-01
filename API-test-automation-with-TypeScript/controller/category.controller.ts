import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.categoryBaseUrl)

class CategoryController {
    getCategories() {
        return request.get('/categories')
    }
    postCategory(payload: {[key: string]: string | number}) {
        return request
            .post('/categories')
            .send(payload)
    }
    getCategoryById(id: string) {
        return request.get('/categories/' + id)
    }
    deleteCategoryById(id: string) {
        return request.delete('/categories/' + id)
    }
    putCategoryById(id: string, payload: {[key: string]: string}) {
        return request
            .put('/categories/' + id)
            .send(payload)
    }
}

export default new CategoryController()