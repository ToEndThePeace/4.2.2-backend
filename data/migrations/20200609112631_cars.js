const TABLE_NAME = "cars";
exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, (tbl) => {
    tbl.increments();
    tbl.string("vin", 255).notNullable().unique();
    tbl.string("make", 255).notNullable();
    tbl.string("model", 255).notNullable();
    tbl.integer("mileage");
    tbl.string("transmission", 255);
    tbl.string("titleStatus", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
