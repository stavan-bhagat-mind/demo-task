const { Models } = require("../models/index");

const {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  ORDER_BY_CREATED_AT_DESC,
  STATUS_CODES,
} = require("../utils/constant");
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_CREATED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  SOMETHING_WENT_WRONG,
  PRODUCT_DOES_NOT_EXIST,
  SUCCESS,
} = require("../utils/message");

module.exports.getListOfProducts = async (req, res) => {
  try {
    const data = await Models.Product.findAndCountAll({
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

module.exports.getProductDataFromId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.Product.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(STATUS_CODES.NOT_FOUND).send({
        data,
        message: PRODUCT_DOES_NOT_EXIST,
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

module.exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Models.Product.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: PRODUCT_DELETED,
    });
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.addEditProduct = async (req, res) => {
  try {
    const { id, name, price, details, created_by } = req.body;
    if (id) {
      const [updated] = await Models.Product.update(
        { name, price, details, created_by },
        {
          where: { id },
          returning: true,
        }
      );
      if (updated) {
        const updatedProduct = updated[1][0];
        res.send({
          data: updatedProduct,
          message: PRODUCT_UPDATED,
        });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({
          message: PRODUCT_NOT_FOUND,
        });
      }
    } else {
      const data = await Models.Product.create({
        name,
        price,
        details,
        created_by,
      });
      console.log(data);
      res.send({
        data,
        message: PRODUCT_CREATED,
      });
    }
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.getListOfProductReviews = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.Product.findAndCountAll({
      include: [
        {
          model: Models.Review,
          as: "product_review",
          attributes: [
            "id",
            "rating",
            "content",
            "created_by",
            "reviewable_id",
          ],
          where: { reviewable_type: "product" },
        },
      ],
      attributes: ["id", "name", "created_at", "updated_at", "created_by"],
      where: { id },
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
