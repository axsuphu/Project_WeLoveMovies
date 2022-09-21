const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

async function read(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.read(reviewId);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
};
