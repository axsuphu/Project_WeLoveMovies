const knex = require("../db/connection");

function list() {
  return knex("reviews").select("*");
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}
module.exports = {
  list,
  read,
};
