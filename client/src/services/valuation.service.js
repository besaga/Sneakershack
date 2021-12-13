import axios from "axios";

class ValuationService {
  constructor() {
    this.app = axios.create({
      baseURL: "http://localhost:5005/api/valuation",
      withCredentials: true,
    });
  }
  createReview = (state) =>
    this.app.post("/create-valuation", state);
  getValuation = (id) => this.app.get(`/${id}`);
}

export default ValuationService;
