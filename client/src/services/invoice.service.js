import axios from 'axios'

class InvoiceService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/invoice`,
      withCredentials: true

    })
  }
  
  confirmPurchase = (userId) => this.app.post(`/${userId}`)
  getInvoice = (invoiceId) => this.app.get(`/${invoiceId}`)
  getAllInvoices = (userId) => this.app.get(`/all/${userId}`)
}

export default InvoiceService