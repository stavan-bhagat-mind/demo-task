const { Models } = require("../models/index");
const {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  ORDER_BY_CREATED_AT_DESC,
  STATUS_CODES,
} = require("../utils/constant");
const {
  SERVICE_NOT_FOUND,
  SERVICE_CREATED,
  SERVICE_UPDATED,
  SERVICE_DELETED,
  SOMETHING_WENT_WRONG,
  SERVICE_DOES_NOT_EXIST,
  SUCCESS,
} = require("../utils/message");

module.exports.getListOfServices = async (req, res) => {
  try {
    const data = await Models.Service.findAndCountAll({
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

module.exports.getServiceDataFromId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.Service.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(STATUS_CODES.NOT_FOUND).send({
        data,
        message: SERVICE_DOES_NOT_EXIST,
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

module.exports.deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Models.Service.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: SERVICE_DELETED,
    });
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.addEditService = async (req, res) => {
  try {
    const { id, name, description, start_date, end_date, created_by } =
      req.body;
    if (id) {
      const [updated] = await Models.Service.update(
        { name, description, start_date, end_date, created_by },
        {
          where: { id },
          returning: true,
        }
      );
      if (updated) {
        const updatedService = updated[1][0];
        res.send({
          data: updatedService,
          message: SERVICE_UPDATED,
        });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({
          message: SERVICE_NOT_FOUND,
        });
      }
    } else {
      const data = await Models.Service.create({
        name,
        description,
        start_date,
        end_date,
        created_by,
      });
      res.send({
        data,
        message: SERVICE_CREATED,
      });
    }
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.getListOfServiceReviews = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.Service.findAndCountAll({
      include: [
        {
          model: Models.Review,
          as: "service_review",
          attributes: [
            "id",
            "rating",
            "content",
            "created_by",
            "reviewable_id",
          ],
          where: { reviewable_type: "service" },
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
