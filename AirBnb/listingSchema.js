const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).max(500000).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("",null)
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment:Joi.string().required()
    }).required()
})