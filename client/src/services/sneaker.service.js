import axios from 'axios'

class SneakerService {
  constructor() {
    this.app = axios.create({
      baseURL: 'http://localhost:5005/api'
    })
  }
  getAllSneakers = () => this.app.get("/sneakers")
  getOneSneaker = (id) => this.app.get(`/sneakers/${id}`)
}

export default SneakerService