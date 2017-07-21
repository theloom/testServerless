import { Component, OnInit } from '@angular/core';
import * as AWS from "aws-sdk";
import { GiftubeApiService } from '../giftube-api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  constructor(private _giftubeApiService: GiftubeApiService) { };

  ngOnInit() { };

  uploadedGif;

  public upload(event) {


    var file = event.srcElement.files[0]; if ('image/gif' !== file.type) {
      alert('You must choose a gif to upload');
      return;
    }

    this._giftubeApiService.createGif(file).subscribe(gif => this.uploadedGif = gif,
      error => console.log('Error creating gif'));
  }
}