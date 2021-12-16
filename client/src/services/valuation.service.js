import axios from "axios";

class ValuationService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/valuation`,
      withCredentials: true,
    });
  }
  createReview = (state) => this.app.post("/", state);
  getValuation = (id) => this.app.get(`/${id}`);
  getAllValuations = (id) => this.app.get(`/all/${id}`);
}

export default ValuationService;
