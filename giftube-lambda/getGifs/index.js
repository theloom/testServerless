'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
var dynamodb = new aws.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {

   var params = {
      TableName: "gifTubeGifs",
   }

   dynamodb.scan(params, (err, data) => {
      var gifs = []; data.Items.forEach((item) => {
         var gif = {};
         gif.id = item.key.S;
         gif.title = item.user_id.S + "-" + item.date.S;
         gif.relativeUrl = item.relative_url.S;
         //gif.url = item.url.S;
         gifs.push(gif);
      });
      callback(null, gifs);
   });
}