import axios from 'axios'

class AuthService {
    constructor() {
        this.app = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true,
            credentials: 'include'
        })
    }

    signup = (email, password) => this.app.post("/auth/signup", { email, password })
    login = (email, password) => this.app.post("/auth/login", { email, password })
    logout = () => this.app.get("/auth/logout")
    isloggedin = () => this.app.get("/auth/isloggedin")
}

export default AuthService