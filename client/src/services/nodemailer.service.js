import axios from 'axios'

class NodemailerService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/nodemailer'
        })
    }

    sendEmail = (invoiceId) => this.app.post(`/bill/${invoiceId}`)

}

export default NodemailerService