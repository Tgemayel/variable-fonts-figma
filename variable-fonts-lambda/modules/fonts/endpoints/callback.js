'use strict';

module.exports.index = async (event) => {
  const { queryStringParameters: qs } = event;
  console.log(qs, event);
  return {
    statusCode: 201,
    body: qs.code
  }
};
