'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const uuid = require('../../../shared/lib/uuid');
const dynamo = require('../../../shared/lib/dynamo');

const DYNAMO_TABLE_FONTS = process.env.DYNAMO_TABLE_FONTS || 'fonts';
const BUCKET_NAME = process.env.S3_BUCKET || 'figma-custom-fonts'

const getUploadUrl = async (name) => {
    const fileName = `${uuid()}-${name}`;

    const s3Params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        ContentType: 'font/ttf',
        CacheControl: 'max-age=31104000',
        ACL: 'public-read'
    };

    return s3.getSignedUrlPromise('putObject', s3Params);
}

module.exports.index = async (event) => {
    try {
        const { headers: { Authorization }, body } = event;
        console.log(body)
        const { font, type } = JSON.parse(body);
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

        let url = font;

        if (type === 'FILE') {
            url = await getUploadUrl(font);
        }

        // const { email, img_url, id, handle } = await fetch('https://api.figma.com/v1/me', {
        //     method: 'get',
        //     headers: {
        //         'X-FIGMA-TOKEN': figmaToken
        //     }
        // }).then(res => res.json());

        
        await dynamo.save({
            hashkey: uuid(),
            uuid: figmaToken,
            font_url: url
        }, DYNAMO_TABLE_FONTS);

        return {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: 'Successfully uploaded',
                url
            })
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
