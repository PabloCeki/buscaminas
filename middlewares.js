const joi = require("joi");
module.exports = function (schemas, options, callback = null) {
  return (req, res, next) => {
    let result = true,
      joiOptions = options || {
        allowUnknown: true,
      };

    let ev = null;

    if (schemas) {
      ev = schemas.body
        ? joi.validate(req.body, schemas.body.required(), joiOptions).error
        : joi.validate(
            { ...req.query, ...req.params },
            schemas.params.required(),
            joiOptions
          ).error;
      result = result && !ev;
    }

    if (result) next();
    else {
        const message = ev.details.map(i => i.message).join(',');
      res.status(400).send(message);
    }
  };
};
