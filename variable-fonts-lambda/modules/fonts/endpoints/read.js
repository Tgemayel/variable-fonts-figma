'use strict';

const dynamo = require('../../../shared/lib/dynamo');
const response = require('../../../shared/lib/response');

const DYNAMO_TABLE_FONTS = process.env.DYNAMO_TABLE_FONTS || 'fonts';

module.exports.list = async (event) => {

    try {
        const { headers: { Authorization } } = event;
        if (!Authorization || !Authorization.includes('Bearer')) {
            return {
                statusCode: 401,
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: 'Unauthorized'
                })
            }
        }

        const figmaToken = Authorization.split(' ')[1];

        const params = {
            FilterExpression: "#uuid = :uuid",
            ExpressionAttributeNames: {
                "#uuid": "uuid",
            },
            ExpressionAttributeValues: {
                ":uuid": figmaToken
            }
        };

        const fonts = await dynamo.scan(params, null, DYNAMO_TABLE_FONTS);  

        console.log(fonts);

        if (fonts.Items.length === 0) {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    message: "Not Found"
                })
            }
        } else {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(fonts.Items.map(item => item.font_url))
            }
        }
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: err.message
            })
        }
    }

};