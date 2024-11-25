const { Models } = require("../models/index");
const {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  ORDER_BY_CREATED_AT_DESC,
  STATUS_CODES,
} = require("../utils/constant");
const {
  REVIEW_NOT_FOUND,
  REVIEW_CREATED,
  REVIEW_UPDATED,
  REVIEW_DELETED,
  SOMETHING_WENT_WRONG,
  REVIEW_DOES_NOT_EXIST,
  SUCCESS,
} = require("../utils/message");

module.exports.getListOfReviews = async (req, res) => {
  try {
    const data = await Models.Review.findAndCountAll({
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
      order: ORDER_BY_CREATED_AT_DESC,
    });
    res.send({
      data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.getReviewDataFromId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.Review.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(STATUS_CODES.NOT_FOUND).send({
        data,
        message: REVIEW_DOES_NOT_EXIST,
      });
    }
    res.send({
      data,
      message: SUCCESS,
    });
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Models.Review.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: REVIEW_DELETED,
    });
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.addEditReview = async (req, res) => {
  try {
    const { id, content, rating, reviewable_type, reviewable_id, created_by } =
      req.body;

    if (id) {
      const [updated] = await Models.Review.update(
        { content, rating, reviewable_type, reviewable_id, created_by },
        {
          where: { id },
          returning: true,
        }
      );
      if (updated) {
        const updatedReview = updated[1][0];
        res.send({
          data: updatedReview,
          message: REVIEW_UPDATED,
        });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({
          message: REVIEW_NOT_FOUND,
        });
      }
    } else {
      const data = await Models.Review.create({
        content,
        rating,
        reviewable_type,
        reviewable_id,
        created_by,
      });
      res.send({
        data,
        message: REVIEW_CREATED,
      });
    }
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};
