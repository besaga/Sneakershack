import axios from 'axios'

class ProfileService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/profile',
            withCredentials: true
        })
    }
    getProfile = (id) => this.app.get(`/${id}`)
    editProfile = (id, body) => this.app.post(`/edit/${id}`, body)
    deleteProfile = (id) => this.app.post(`/delete/${id}`)
}

export default ProfileService