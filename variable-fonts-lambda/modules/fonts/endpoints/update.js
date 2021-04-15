'use strict';

const dynamo = require('../../../shared/lib/dynamo');
const response = require('../../../shared/lib/response');

const DYNAMO_TABLE_FONTS = process.env.DYNAMO_TABLE_FONTS || 'fonts';

/**
 * Update Item with PUT request
 *
 * {
 *  "title" : "updated"
 * }
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
module.exports.update = (event, context, callback) => {

  const body = event.body ? event.body : event;
  const data = JSON.parse(body);

  const key = {
    hashkey: event.pathParameters.hashkey
  };

  const params = {};

  if (data.title) {
    params.title = {
      Action: 'PUT',
      Value: data.title
    };
  }

  if (data.author) {
    params.author = {
      Action: 'PUT',
      Value: data.author
    };
  }

  if (data.price) {
    params.price = {
      Action: 'PUT',
      Value: data.price
    };
  }

  dynamo.updateItem(key, params, DYNAMO_TABLE_FONTS).then(success => {

    response.json(callback, success.Attributes);

  });

};
