const sendEmail = require("../config/pugConfig");
const { Models } = require("../models/index");
const {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  ORDER_BY_CREATED_AT_DESC,
  STATUS_CODES,
} = require("../utils/constant");
const path = require("path");
const {
  USER_NOT_FOUND,
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
  SOMETHING_WENT_WRONG,
  USER_DOES_NOT_EXIST,
  SUCCESS,
} = require("../utils/message");
const redisClient = require("../config/redisConfig");

module.exports.getListOfUsers = async (req, res) => {
  try {
    const { rows, count } = await Models.User.findAndCountAll({
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
      order: ORDER_BY_CREATED_AT_DESC,
    });
    res.send({
      data: rows,
      meta: { count },
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

    // let userData = await redisClient.hGetAll(`user:${id}`);
    let userData = await redisClient.get(`userData${id}`);
    if (userData && Object.keys(userData).length > 0) {
      userData = JSON.parse(userData);
      return res.send({
        data: userData,
        message: SUCCESS,
      });
    }
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
    return res.send({
      data,
      message: SUCCESS,
    });
  } catch (e) {
    return res.send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const result = await Models.User.destroy({
      where: {
        id: id,
      },
    });
    await redisClient.del(`userData${id}`);
    // await redisClient.del(`user:${id}`);
    res.send({
      data: result,
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
    const { id, name, email, password, address } = req.body;
    if (id) {
      const data = await Models.User.update(
        { name, email, password, address },
        {
          where: { id },
          returning: true,
        }
      );
      if (data) {
        await redisClient.del(`userData${id}`);
        await redisClient.set(
          `userData${data.dataValues.id}`,
          JSON.stringify(data),
          "EX",
          7200
        );
        const updatedUser = updated[1][0];
        return res.status(200).send({
          data: updatedUser,
          message: USER_UPDATED,
        });
      } else {
        return res.status(STATUS_CODES.NOT_FOUND).send({
          message: USER_NOT_FOUND,
        });
      }
    } else {
      const data = await Models.User.create({ name, email, password, address });
      const emailData = {
        subject: "Node.js Email Example",
        receiver: {
          name: data.name,
          email: data.email,
        },
        text: "This is a test email. thank you for understanding!",
      };
      await redisClient.set(
        `userData${data.dataValues.id}`,
        JSON.stringify(data),
        "EX",
        7200
      );
      // await redisClient.hSet(`user:${data.dataValues.id}`, {
      //   created_at: data.dataValues.created_at.toString(),
      //   updated_at: data.dataValues.updated_at.toString(),
      //   deleted_at: data.dataValues.deleted_at
      //     ? data.dataValues.deleted_at.toString()
      //     : "",
      //   id: data.dataValues.id.toString(),
      //   name: data.dataValues.name,
      //   email: data.dataValues.email,
      //   password: data.dataValues.password,
      //   address: data.dataValues.address ? data.dataValues.address : "",
      // });

      const fullTemplatePath = path.join(
        __dirname,
        "../public/views/emailTemplate.pug"
      );
      await sendEmail(emailData, fullTemplatePath);
      res.status(201).send({
        data,
        message: USER_CREATED,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(STATUS_CODES.CREATED).send({
      data: null,
      message: SOMETHING_WENT_WRONG,
    });
  }
};
