const db = require("../data/connection");
function validateCarID(req, res, next) {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      if (!car) throw "Car not found";
      req.car = car;
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: "Car not found" });
    });
}
function validateCar(req, res, next) {
  const { body: newCar } = req;
  if (!newCar.vin && !newCar.make && !newCar.model && !newCar.mileage) {
    res.status(400).json({ message: "No car data provided" });
  } else if (!newCar.vin || !newCar.make || !newCar.model || !newCar.mileage) {
    res
      .status(400)
      .json({ message: "VIN, make, model, and mileage are required" });
  } else next();
}

module.exports = {
  validateCarID,
  validateCar,
};
