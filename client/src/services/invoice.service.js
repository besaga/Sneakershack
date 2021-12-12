import axios from 'axios'

class InvoiceService {
  constructor() {
    this.app = axios.create({
      baseURL: 'http://localhost:5005/api/invoice'
    })
  }
  
  confirmPurchase = (userId) => this.app.post(`/${userId}`)
  getInvoice = (invoiceId) => this.app.get(`/${invoiceId}`)
  getAllInvoices = (userId) => this.app.get(`/all/${userId}`)
}

export default InvoiceService