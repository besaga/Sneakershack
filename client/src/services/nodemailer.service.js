import axios from 'axios'

class NodemailerService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/nodemailer`,
            withCredentials: true

        })
    }

    sendEmail = (invoiceId) => this.app.post(`/bill/${invoiceId}`)

}

export default NodemailerService