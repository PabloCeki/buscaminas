"use strict";
const express = require("express");
const joi = require("joi");
const router = express.Router();
const buscaminas = require("./buscaminas.controller");
const validate = require("./middlewares");

const partida = () =>
  validate({
    body: joi.object().keys({
      minasLocalizadas: joi.number().integer().required(),
      campo: joi.array().required(),
    }),
  });

router.get("/:id?", (req, res) => {
  const { id } = req.params;
  res.send(buscaminas.get(id));
});

router.post("/:id?", partida(), (req, res) => {
  const { id } = req.params;
  const partida = req.body;
  const ret = buscaminas.update(id, partida);
  res.sendStatus((ret && 200) || 404);
});

module.exports = router;
