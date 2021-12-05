import axios from 'axios'

class AuthService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api',
            withCredentials: true
        })
    }

    signup = (email, password) => this.app.post("/auth/signup", { email, password })
    login = (email, password) => this.app.post("/auth/login", { email, password })
    logout = () => this.app.get("/auth/logout")
    isloggedin = () => this.app.get("/auth/isloggedin")
}

export default AuthService