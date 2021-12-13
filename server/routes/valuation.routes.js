const router = require("express").Router()
const Valuation = require("../models/Valuation.model")


router.get("/all/:productId", (req, res) => {

    const {productId} = req.params;

    Valuation.find({productId: productId})
        .populate({
            path: 'userId',
            model: 'User'
        })
        .then((valuations) => res.status(200).json(valuations))
        .catch(err => res.status(500).json({err, errMessage: "value not found"}))
});

router.post("/", (req, res) => {
    const { comment, rating, productId } = req.body
    const userId = req.session.currentUser._id

    Valuation.create({ userId, comment, rating: Number(rating), productId })
        .then((valuation) => {
            valuation.populate({
                path: 'userId',
                model: 'User'
            })
            .then(populatedValuation => {
                res.status(200).json(populatedValuation)
            })            
        })
        .catch(err => res.status(500).json(err))
});

router.get("/:id", (req, res) =>{
    const {id}=req.params
    Valuation.findById(id)
    .then((oneValuation) => res.json(oneValuation))
    .catch(err => res.json({err, errMessage: "value not found"}))
}

)


module.exports = router;