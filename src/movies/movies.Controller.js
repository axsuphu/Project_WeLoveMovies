const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing) {
    res.json({ data: await service.showingList(is_showing) });
  }
  res.json({ data: await service.list() });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function theatersList(req, res, next) {
  const movie_id = req.params.movieId;
  res.json({ data: await service.readTheater(movie_id) });
}

async function reviewsList(req, res, next) {
  const review = await service.readReviews(req.params.movieId);
  res.status(201).json({ data: review });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  theatersList: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(theatersList),
  ],
  reviewsList: asyncErrorBoundary(reviewsList),
};
