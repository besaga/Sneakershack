const router = require("express").Router()
const Valuation = require("../models/Valuation.model")


router.get("/productValuations/:productId", (req, res) => {

    const {productId} = req.params;

    Valuation.find({product: productId})
    .populate("userId")
    .then((resp) => res.json(resp))
    .catch(err => res.json({err, errMessage: "value not found"}))

});

router.post("/create-valuation", (req, res) => {
    const { comment, rating, product } = req.body
    const userId = req.session.currentUser._id

    Valuation.create({ userId, comment, rating: Number(rating), product })
    .then((response) => {
      res.json(response);
    });
});

router.get("/:id", (req, res) =>{
    const {id}=req.params
    Valuation.findById(id)
    .then((oneValuation) => res.json(oneValuation))
    .catch(err => res.json({err, errMessage: "value not found"}))
}

)


module.exports = router;