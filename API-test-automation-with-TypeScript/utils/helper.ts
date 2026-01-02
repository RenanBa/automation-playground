import authenticationController from "../controller/authentication.controller"
import categoryController from "../controller/category.controller"
const auth = authenticationController

class TestHelper {

    categoryCtrl = categoryController

    async login(email: string, password: string) {
        try {
            const res = await auth.login({ 'email': email, 'password': password })
            console.log(res.body)   
            return res.body.token
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    } 

    async createCategory(token: string) {
        const name = "Test Category " + Math.floor(Math.random() * 100000)
        const playload = {
            'name': name
        }
        try {
            const res = await this.categoryCtrl.postCategory(playload, token)
            console.log(res.body)   
            return  res
        } catch (error) {
            console.error('Create category failed:', error)
            throw error
        }
    }
}

export default new TestHelper()