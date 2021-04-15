'use strict';

const dynamo = require('../../../shared/lib/dynamo');
const response = require('../../../shared/lib/response');

const DYNAMO_TABLE_FONTS = process.env.DYNAMO_TABLE_FONTS || 'fonts';

module.exports.delete = (event, context, callback) => {

    const key = { hashkey: event.pathParameters.hashkey };

    dynamo.removeRow(key, DYNAMO_TABLE_FONTS)
        .then(success => {

            response.json(callback, success, 204);

        }).catch(err => {

            response.json(callback, err, 500);

        });

};