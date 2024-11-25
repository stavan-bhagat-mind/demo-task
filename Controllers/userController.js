const { Models } = require("../models/index");
const {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  ORDER_BY_CREATED_AT_DESC,
  STATUS_CODES,
} = require("../utils/constant");
const {
  USER_NOT_FOUND,
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
  SOMETHING_WENT_WRONG,
  USER_DOES_NOT_EXIST,
  SUCCESS,
} = require("../utils/message");

module.exports.getListOfUsers = async (req, res) => {
  try {
    const data = await Models.User.findAndCountAll({
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

module.exports.getUserDataFromId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Models.User.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(STATUS_CODES.NOT_FOUND).send({
        data,
        message: USER_DOES_NOT_EXIST,
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

module.exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Models.User.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: USER_DELETED,
    });
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.addEditUser = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (id) {
      const [updated] = await Models.User.update(
        { name },
        {
          where: { id },
          returning: true,
        }
      );
      if (updated) {
        const updatedUser = updated[1][0];
        res.send({
          data: updatedUser,
          message: USER_UPDATED,
        });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({
          message: USER_NOT_FOUND,
        });
      }
    } else {
      const data = await Models.User.create({ name });
      res.send({
        data,
        message: USER_CREATED,
      });
    }
  } catch (e) {
    res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};
