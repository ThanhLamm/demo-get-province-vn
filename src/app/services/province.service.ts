import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  provinces = 'https://provinces.open-api.vn/api/p'
  districts = 'https://provinces.open-api.vn/api/p';
  wards = 'https://provinces.open-api.vn/api/d';

  province = 'https://provinces.open-api.vn/api/p/1';
  district = 'https://provinces.open-api.vn/api/d/1';  
  ward = 'https://provinces.open-api.vn/api/w/1';

  constructor(private http: HttpClient) { }

  getAllProvinces() {
    return this.http.get(this.provinces);
  }

  getDistricts(code:number) {
    return this.http.get(this.districts+'/'+code+'?depth=2');
  }

  getWards(code:number) {
    return this.http.get(this.wards+'/'+code+'?depth=2');
  }
}
