class Buscaminas {
  partidas = [];
  id = 1;
  constructor(filas, columnas, minas) {
    this.filas = filas;
    this.columnas = columnas;
    this.minas = minas;
    this.minasLocalizadas = 0;
  }

  generar() {
    this.campo = [];
    this.campo = new Array(this.filas);
    for (let f = 0; f < this.filas; f++)
      this.campo[f] = new Array(this.columnas);

    let nMinas = 0;
    while (nMinas < this.minas) {
      let fila = Math.floor(Math.random() * this.filas);
      let columna = Math.floor(Math.random() * this.columnas);

      if (this.campo[fila][columna] != "*") {
        this.campo[fila][columna] = "*";
        nMinas++;
      }
    }

    this.count();
    let partida = {
      id: this.id++,
      minasLocalizadas: 0,
      campo: this.campo,
      resolved: null,
    };
    this.partidas.push(partida);
    return partida;
  }

  getIndex(id) {
    return this.partidas.findIndex((e) => e.id == id);
  }
  getPartida(id) {
    let index = this.getIndex(id);
    if (index != -1) return this.partidas[index];
    return -1;
  }
  update(id, partida) {
    let index = this.getIndex(id);
    if (index == -1) return -1;
    this.partidas[index] = partida;
  }
  tablero(id) {
    let index = this.getIndex(id);
    if (index == -1) return -1;
    for (let i = 0; i < this.filas; i++) {
      let str = "";
      for (let e = 0; e < this.columnas; e++) {
        str += this.partidas[index].campo[i][e] + " ";
      }

      console.log(str);
    }
  }
  roundCount(fila, columna) {
    let n = 0;
    for (let _fila = fila - 1; _fila <= fila + 1; _fila++)
      for (let _columna = columna - 1; _columna <= columna + 1; _columna++)
        if (
          _fila > -1 &&
          _fila < this.filas &&
          _columna > -1 &&
          _columna < this.columnas
        )
          if (this.campo[_fila][_columna] == "*") n++;
    this.campo[fila][columna] = n;
  }
  count() {
    for (let fila = 0; fila < this.filas; fila++)
      for (let columna = 0; columna < this.columnas; columna++) {
        if (this.campo[fila][columna] != "*") this.roundCount(fila, columna);
      }
  }

  open(id, fila, columna) {
    let partida = this.partidas[this.getIndex(id)];

    if (
      fila > -1 &&
      fila < this.filas &&
      columna > -1 &&
      columna < this.columnas
    ) {
      if (
        partida.campo[fila][columna] !== "*" &&
        partida.campo[fila][columna] != -1
      ) {
        if (partida.campo[fila][columna] == 0) {
          partida.campo[fila][columna] = -1;
          this.open(id, fila - 1, columna - 1);
          this.open(id, fila - 1, columna);
          this.open(id, fila - 1, columna + 1);
          this.open(id, fila, columna - 1);
          this.open(id, fila, columna + 1);
          this.open(id, fila + 1, columna - 1);
          this.open(id, fila + 1, columna);
          this.open(id, fila + 1, columna + 1);
        }
      } else if (partida.campo[fila][columna] == "*")
        return (partida.resolved = false);
    }

    return null;
  }
}
module.exports = Buscaminas;
