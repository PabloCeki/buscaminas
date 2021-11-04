let chaiHttp = require("chai-http");
let chai = require("chai");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:5050";

describe("Obtener o crear partidas: ", () => {
  it("Deberia obtener una determina partida o devolver una en caso de no existir", (done) => {
    chai
      .request(url)
      .get("/buscaminas/1")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id").that.is.a('number');;
        expect(res.body).to.have.property("minasLocalizadas").that.is.a('number');
        expect(res.body).to.have.property("campo").to.be.an('array');
        done();
      });
  });
});

describe("Guardar una partida: ", () => {
    it("Deberia almacenar una partida enviendo un JSON", (done) => {
      chai
        .request(url)
        .post("/buscaminas/1")
        .send(
            {
                "id": 1,
                "minasLocalizadas": 2,
                "campo": [
                  ["*", 2, "*", 2, "*", "*", 1, 1, 1, 1],
                  [2, 4, 3, 5, 5, 4, 2, 1, "*", 1],
                  ["*", 2, "*", "*", "*", "*", 1, 1, 1, 1],
                  [1, 2, 2, 4, "*", 4, 2, 0, 0, 0],
                  [0, 0, 0, 1, 3, "*", 2, 0, 1, 1],
                  [0, 0, 0, 0, 2, "*", 3, 1, 3, "*"],
                  [0, 1, 2, 2, 2, 1, 2, "*", 3, "*"],
                  [0, 1, "*", "*", 1, 1, 2, 2, 2, 1],
                  [0, 1, 2, 2, 1, 2, "*", 2, 0, 0],
                  [0, 0, 0, 0, 0, 2, "*", 2, 0, 0]
                ],
                "resolved": true
              }
              
        )
        .end(function (err, res) {
           expect(res).to.have.status(200);
           done();
        });
    });
  });
