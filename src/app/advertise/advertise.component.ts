import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {

  address: string;
  step1Form = new FormGroup({
    livesInLocal: new FormControl(null, Validators.required),
    hasPet: new FormControl(null, Validators.required),
    genderRestriction: new FormControl(null, Validators.required),
    howManyLivesInLocal: new FormControl(null, Validators.required),
    hasFurniture: new FormControl(null, Validators.required),
  });

  step2Form = new FormGroup({
    wifi: new FormControl(false, Validators.required),
    parkingSpace: new FormControl(false, Validators.required),
    writingDesk: new FormControl(false, Validators.required),
    bed: new FormControl(false, Validators.required),
    mealIncluded: new FormControl(false, Validators.required),
    air: new FormControl(false, Validators.required),
    washMachine: new FormControl(false, Validators.required),
    suite: new FormControl(false, Validators.required),
    tv: new FormControl(false, Validators.required),
  });

  step3Form = new FormGroup({
    description: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
  });

  files: {name: string, url: string}[] = [];

  constructor() {}

  ngOnInit() {}

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
    if (stepper.selectedIndex === 4) {
      this.submit();
    }
  }

  setAddress() {
    if (this.step3Form.controls.address.value) {
      this.address = this.step3Form.controls.address.value;
    }
  }

  filesComplete(data: {name: string, url: string}) {
    this.files.push(data);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  submit() {
    // Logica de submissão dos dados
  }
}
