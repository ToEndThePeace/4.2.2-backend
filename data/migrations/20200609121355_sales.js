exports.up = function (knex) {
  return knex.schema.createTable("sales", (tbl) => {
    tbl.increments();
    tbl.foreign("id", "car_id").references("id").inTable("cars");
    tbl.integer("sale_price").notNullable();
    tbl.string("notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales");
};
