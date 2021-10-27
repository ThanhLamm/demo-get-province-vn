import { Component, OnInit } from '@angular/core';
import { Province } from 'src/app/common/Province';
import { District } from 'src/app/common/District';
import { ProvinceService } from 'src/app/services/province.service';
import { Ward } from 'src/app/common/ward';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  provinces!: Province[];
  districts!: District[];
  wards!: Ward[];

  province!: Province;
  district!: District;

  provinceCode!: number;
  districtCode!: number;

  postForm: FormGroup;

  constructor(private location: ProvinceService) {
    this.postForm = new FormGroup({
      'province': new FormControl(0, [Validators.required, Validators.min(1)]),
      'district': new FormControl(0, [Validators.required, Validators.min(1)]),
      'ward': new FormControl(0, [Validators.required, Validators.min(1)]),
      'number': new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'province': new FormControl(66, [Validators.required, Validators.min(1)]),
      'district': new FormControl(647, [Validators.required, Validators.min(1)]),
      'ward': new FormControl(24241, [Validators.required, Validators.min(1)]),
      'number': new FormControl('nha o day', Validators.required),
    })
    this.provinceCode = this.postForm.value.province
    this.districtCode = this.postForm.value.district
    this.getProvinces();
    this.getDistricts();
    this.getWards();    
  }

  getProvinces() {
    this.location.getAllProvinces().subscribe(data => {
      this.provinces = data as Province[];
    })
  }

  getDistricts() {
    this.location.getDistricts(this.provinceCode).subscribe(data => {
      this.province = data as Province;
      this.districts = this.province.districts;
    })
  }

  getWards() {
    this.location.getWards(this.districtCode).subscribe(data => {
      this.district = data as District;
      this.wards = this.district.wards;
    })
  }

  setProvinceCode(code: any) {
    this.provinceCode = code.value;
    this.getDistricts();
  }

  setDistrictCode(code: any) {
    this.districtCode = code.value;
    this.getWards();
  }

  submit() {
    if(this.postForm.invalid) {
      console.log("mgu");
      
    } else {
      console.log(this.postForm.value);
      
    }
  }
}
