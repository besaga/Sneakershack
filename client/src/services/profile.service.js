import axios from 'axios'

class ProfileService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/profile`,
            withCredentials: true
        })
    }
    getProfile = (id) => this.app.get(`/${id}`)
    editProfile = (id, body) => this.app.post(`/edit/${id}`, body)
    deleteProfile = (id) => this.app.post(`/delete/${id}`)
}

export default ProfileService