import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.categoryBaseUrl)

class CategoryController {
    getCategories() {
        return request.get('/categories')
    }
    postCategory(payload: {[key: string]: string | number}, token: string) {
        return request
            .post('/categories')
            .set('Authorization', 'Bearer ' + token)
            .send(payload)
    }
    getCategoryById(id: string) {
        return request.get('/categories/' + id)
    }
    deleteCategoryById(id: string, token: string) {
        return request
            .delete('/categories/' + id)
            .set('Authorization', 'Bearer ' + token)
    }
    putCategoryById(id: string, payload: {[key: string]: string}, token: string) {
        return request
            .put('/categories/' + id)
            .set('Authorization', 'Bearer ' + token)
            .send(payload)
    }
}

export default new CategoryController()