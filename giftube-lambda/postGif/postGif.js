'use strict';

var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({ apiVersion: '2012-08-10' });

var s3 = new aws.S3({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
   console.log("Asking to upload file: " + JSON.stringify(event));

   var params = {
      Bucket: 'jd.giftube.gifs',
      Key: event.fileName,
      ACL: 'public-read',
      ContentType: 'image/gif',
      Body: event.image,
      Metadata: {
         //user_id: localStorage.getItem('user_id')
      },
   };

   s3.putObject(params, function (err, data) {
      if (err) {
         console.error("Error putting to S3: " + err);
      } else {
         console.log("Success putting image to S3: " + event.fileName);
      }
   });

   callback(null, 'Created file, thanks');
};