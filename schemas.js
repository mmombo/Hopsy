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
