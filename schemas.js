const Joi = require("joi");

module.exports.brewerySchema = Joi.object({
  brewery: Joi.object({
    name: Joi.string().required(),
    hasFood: Joi.boolean(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    photoURL: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required(),
  }).required(),
});
