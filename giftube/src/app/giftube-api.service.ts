import { Injectable } from '@angular/core'; import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; import 'rxjs/add/operator/map';

@Injectable()
export class GiftubeApiService {

  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = "https://0sm24gz11l.execute-api.us-east-1.amazonaws.com/testServerless/";
  }

  fetchGifs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gifs`)
      .map(response => response.json());
  }

  createGif(file): Observable<any> {
    return this.http.post(`${this.baseUrl}`, file)
      .map(response => response.json());
  }
}