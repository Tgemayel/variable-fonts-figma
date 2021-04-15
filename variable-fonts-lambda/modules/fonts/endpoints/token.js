'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports.index = async (event) => {
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: uuidv4()
  }
};
