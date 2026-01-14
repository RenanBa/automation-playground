import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.fileuploadBaseUrl)

class FileUploadController {
    postUploadSingle(filePath: string) {
        return request
            .post('/upload/single')
            .attach('single', filePath)
    }
    
    postUploadMultiple(files: string[]) {
        const req = request
            .post('/upload/multiple')
        files.forEach(filePath => {
            req.attach('multiple', filePath)
        })
        return req
    }
}

export default new FileUploadController()