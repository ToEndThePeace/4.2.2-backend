const router = require("express").Router();
const db = require("../data/connection");

router.get("/", (req, res) => {
  db("cars")
    .select()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not find car" });
    });
});

router.post("/", (req, res) => {
  const { body: newCar } = req;
  db("cars")
    .insert(newCar)
    .then(([id]) => {
      db("cars")
        .where({ id })
        .first()
        .then((newCar) => {
          res.status(201).json(newCar);
        })
        .catch((err) => {
          res.status(500).json({ message: "Car could not be saved" });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Car could not be saved" });
    });
});

module.exports = router;
