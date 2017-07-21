import { Injectable } from '@angular/core'; import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; import 'rxjs/add/operator/map';

@Injectable()
export class GiftubeApiService {

  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = "https://0sm24gz11l.execute-api.us-east-1.amazonaws.com/testServerless/gifs";
  }

  fetchGifs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
      .map(response => response.json());
  }

  createGif(file): Observable<any> {
    console.log("createGif file is: " + file);
    return this.http.post(`${this.baseUrl}?name=${file.name}`, file)
      .map(response => response.json());
  }
}