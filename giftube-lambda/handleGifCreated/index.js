'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
var dynamodb = new aws.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
   console.log("handleGifCreated event: " + JSON.stringify(event));
   const region = event.Records[0].awsRegion;
   const bucket = event.Records[0].s3.bucket.name;
   const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
   const params = {
      Bucket: bucket,
      Key: key,
   };

   s3.getObject(params, (err, data) => {
      if (err) {
         console.log(err);
         const message = `Error getting object ${key} from bucket ${bucket}.`;
         console.log(message);
         callback(message);
      } else {
         //https://s3.amazonaws.com/jd.giftube.gifs/gifs/cat-macbook.gif
         //var url = 'https://s3.amazonaws.com/jd.giftube.gifs/gifs/' + key;
         var datetime = new Date().getTime().toString(); var userid = data.Metadata.user_id || "none";
         dynamodb.putItem({
            "TableName": "gifTubeGifs",
            "Item": {
               "key": { "S": key },
               "date": { "S": datetime },
               "user_id": { "S": userid },
               "relative_url": { "S": key },
            }
         }, function (err, data) {
            if (err) {
               console.log('error', err)
               callback('Unable to put ' + key + ' item into dynamodb failed: ' + err);
            } else {
               console.log('Put : ' + JSON.stringify(data, null, ' ')); callback(null, 'Put ' + key);
            }
         });
      }
   });
};