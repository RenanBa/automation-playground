import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.brandBaseUrl)


class AuthenticationController {
    login(payload: {[key: string]: string}) {
        return request
            .post('/admin/login')
            .send(payload)
    }
}

export default new AuthenticationController()