const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//lists all movies
function list() {
  return knex("movies").select("*");
}

//lists all movies which have is_showing is true
function showingList(is_showing) {
  return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
}

//lists all movies that match the movie_id
function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

//returns all the `theaters` where the movie is playing.
function readTheater(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where("m.movie_id", movie_id);
}

//return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.
const mappedReviews = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((res) => res.map(mappedReviews));
}

module.exports = {
  list,
  showingList,
  read,
  readTheater,
  readReviews,
};
