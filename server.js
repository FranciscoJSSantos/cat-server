var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");

app.use(
  express.urlencoded({
    extended: true,
  }),
  cors()
);

app.use(express.json());

let arrayCats = [];
var testearrayCats = [];
var newCatList = [];

async function checkListOfCats() {
  fs.readdir(__dirname + "/cats", async (err, files) => {
    for (let index = 0; index < files.length; index++) {
      testearrayCats.push(
        fs.readFileSync(__dirname + "/cats" + `/${index + 1}.json`, {
          encoding: "utf8",
          flag: "r",
        })
      );
    }

    testearrayCats.forEach((cat) => {
      newCatList.push(JSON.parse(cat));
    });
  });
}

checkListOfCats();

app.get("/cats/:id", function (req, res) {
  const id = req.params.id;
  let cats = newCatList;

  let filterCat = cats.filter((cat) => cat.id === parseInt(id));

  res.json(filterCat);
});

app.put("/cats/:id", function (req, res) {
  const id = req.params.id;
  let cats = newCatList;

  let filterCat = cats.filter((cat) => cat.id === parseInt(id));

  cats[id - 1].name = req.body.name;
  cats[id - 1].dataNascimento = req.body.dataNascimento;
  cats[id - 1].especie = req.body.especie;
  cats[id - 1].raca = req.body.raca;
  cats[id - 1].sexo = req.body.sexo;
  cats[id - 1].pai = req.body.pai;
  cats[id - 1].mae = req.body.mae;
  cats[id - 1].endereco = req.body.endereco;
  cats[id - 1].cidade = req.body.cidade;
  cats[id - 1].telefone = req.body.telefone;

  fs.writeFileSync(
    __dirname + "/" + `cats/${id}.json`,
    JSON.stringify(cats[id - 1]),
    "utf-8"
  );

  res.json(filterCat);
});

app.get("/getAllCats", function (req, res) {
  fs.readFile(__dirname + "/" + "cats.json", "utf8", function (err, data) {
    res.end(JSON.stringify(newCatList));
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listen", host, port);
});
