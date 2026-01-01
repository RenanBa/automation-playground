import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.brandBaseUrl)

class BrandController {
    getBrands() {
        return request.get('/brands')
    }
    postBrand(payload: {[key: string]: string | number}) {
        return request
            .post('/brands')
            .send(payload)
    }
    getBrandById(id: string) {
        return request.get('/brands/' + id)
    }
    deleteBrandById(id: string) {
        return request.delete('/brands/' + id)
    }
    putBrandById(id: string, payload: {[key: string]: string}) {
        return request
            .put('/brands/' + id)
            .send(payload)
    }
}

export default new BrandController()