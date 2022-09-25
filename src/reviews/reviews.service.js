const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//lists all reviews
function list() {
  return knex("reviews").select("*");
}

//lists review with specific review id passed in as parameter
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

//will update an existing review
function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

//using mapProperties from /utils
const mapCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//endpoint to update and output critic data by ID
function addCritics(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ review_id })
    .first()
    .then(mapCritics);
}

//delete specific review with review id passed in as parameter
function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  addCritics,
  destroy,
};
