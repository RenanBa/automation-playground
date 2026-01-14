import authenticationController from "../controller/authentication.controller"
import fileuploadController from "../controller/fileupload.controller"
import config from '../config/base.config'

describe('File Upload tests', () => {
    it ('POST /upload/single', async () => {
        const res = await fileuploadController.postUploadSingle('data/yayazinha.jpeg')
        console.log(res.body)
        expect(res.status).toBe(200)
        expect(res.body.filename).toEqual('yayazinha.jpeg')
        expect(res.body.size).toEqual('21939')
    })

    it ('POST /upload/multiple', async () => {
        const files = [
            'data/yayazinha.jpeg', 
            'data/listening-ears.png'
        ]
        const res = await fileuploadController.postUploadMultiple(files)
        console.log(res.body)
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(files.length)
        expect(res.body[0].filename).toEqual('yayazinha.jpeg')
        expect(res.body[1].filename).toEqual('listening-ears.png')  
        expect(res.body[0].size).toEqual('21939')
        expect(res.body[1].size).toEqual('25639')
    })
})