const {filas,columnas,minas} = require('./env.json').game;
const Buscaminas = require("./clases/buscaminas");
const game = new Buscaminas(filas || 10, columnas || 10, minas || 20);

const get = (id) => {
  let partida = game.getPartida(id);
  if (partida == -1) return game.generar();
  else return partida;
};
const update = (id, partida) => {
  if (id && game.update(id, partida) != -1) return true;
  else return false;
};

module.exports = {
  get,
  update,
};
