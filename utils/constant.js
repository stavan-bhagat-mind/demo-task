// constants.js

module.exports = {
  DEFAULT_OFFSET: 0,
  DEFAULT_LIMIT: 10,
  ORDER_BY_CREATED_AT_DESC: [["created_at", "desc"]],
  STATUS_CODES: {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    CREATED: 201,
  },
};
