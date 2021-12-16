import axios from 'axios'

class SneakerService {
  constructor() {
    this.app = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }
  getAllSneakers = () => this.app.get("/sneakers")
  getOneSneaker = (id) => this.app.get(`/sneakers/${id}`)
}

export default SneakerService