import { Component, OnInit } from '@angular/core';
import * as AWS from "aws-sdk";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  constructor() { } ngOnInit() { }

  public upload(event) {

    var file = event.srcElement.files[0]; if ('image/gif' !== file.type) {
      alert('You must choose a gif to upload');
      return
    }

    /** HACK: THIS IS NOT A SECURE WAY TO UPLOAD TO S3 **/
    /** THESE CREDENTIALS ARE IN PLAIN TEXT IN THE BROWSER **/
    var accessKey = 'AKIAICXX3SMH5JUJLMKA';
    var secretKey = '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';
    var awsCreds = new AWS.Credentials(accessKey, secretKey);
    var s3 = new AWS.S3({ credentials: awsCreds, region: 'us-east-1' });
    var params = {
      Bucket: 'jd.giftube.gifs',
      Key: file.name,
      ACL: 'public-read',
      ContentType: 'image/gif',
      Body: file,
      Metadata: {
        //user_id: localStorage.getItem('user_id')
      },
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        alert('Error when uploading to s3'); console.error(err);
      } else {
        this.onSuccessfulAdd(data);
      }
    });
  }
}