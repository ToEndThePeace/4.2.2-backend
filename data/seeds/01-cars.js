exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert(getCarData());
    });
};

function getCarData() {
  return [
    { vin: "292934059195033", make: "Honda", model: "Civic", mileage: 2020 },
    { vin: "303030404059922", make: "Honda", model: "Accord", mileage: 652 },
    { vin: "564996030302929", make: "Honda", model: "CR-V", mileage: 234 },
    { vin: "340506060493822", make: "Honda", model: "Fit", mileage: 345543 },
    { vin: "459600928450506", make: "Honda", model: "Odyssey", mileage: 2454 },
  ];
}
