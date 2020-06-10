const router = require("express").Router();
const db = require("../data/connection");
const { validateCar, validateCarID } = require("../middleware");

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

router.get("/:id", validateCarID, (req, res) => {
  res.status(200).json(req.car);
});

router.post("/", validateCar, (req, res) => {
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

router.delete("/:id", validateCarID, (req, res) => {
  const { id } = req.car;
  db("cars")
    .where({ id })
    .del()
    .then((count) => {
      if (count > 0) res.status(204).end();
      else res.status(404).json({ message: "Car could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Car could not be deleted" });
    });
});

router.put("/:id", validateCarID, (req, res) => {
  const { body: changes } = req;
  const { id } = req.car;
  db("cars")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) res.status(204).end();
      else res.status(404).json({ message: "Car could not be updated" });
    });
});

module.exports = router;
