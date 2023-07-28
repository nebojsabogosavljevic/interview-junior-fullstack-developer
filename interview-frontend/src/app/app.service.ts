import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  getCities() {
    return this._http.get('http://localhost:3000/cities');
  }
  getCityByUUID(uuid: string) {
    return this._http.get(`http://localhost:3000/cities/uuid/${uuid}`);
  }
  getCitiesByCityName(cityName: string) {
    return this._http.get(`http://localhost:3000/cities/cityName/${cityName}`);
  }
}
