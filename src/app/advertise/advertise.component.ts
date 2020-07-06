import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { ModalAddressComponent } from '@shared/components/modal-address/modal-address.component';
import { CreateOfferModel } from '@shared/models';

import { OfferService } from '../shared/services/offer.service';


@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {

  step1Form = new FormGroup({
    livesInLocal: new FormControl(null, Validators.required),
    genderRestriction: new FormControl(null, Validators.required),
    howManyLivesInLocal: new FormControl(null, Validators.required),
    hasFurniture: new FormControl(null, Validators.required),
  });

  step2Form = new FormGroup({
    wifi: new FormControl(false, Validators.required),
    parkingSpace: new FormControl(false, Validators.required),
    writingDesk: new FormControl(false, Validators.required),
    mealIncluded: new FormControl(false, Validators.required),
    air: new FormControl(false, Validators.required),
    washMachine: new FormControl(false, Validators.required),
    suite: new FormControl(false, Validators.required),
    tv: new FormControl(false, Validators.required),
  });

  step3Form = new FormGroup({
    description: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    addressForm: new FormGroup({
      cep: new FormControl(null, [Validators.required, Validators.maxLength(9)]),
      place: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      reference: new FormControl(null),
    }),
  });

  addressControl = new FormControl(null);

  files: {name: string, url: string}[] = [];

  constructor(
    private offerService: OfferService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {}

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    if (stepper.selectedIndex === 4) {
      this.submit();
    }
    stepper.next();
  }

  filesComplete(data: {name: string, url: string}) {
    this.files.push(data);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  openAddressModal(): void {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: window.innerWidth > 500 ? '500px' : window.innerWidth + 'px',
      data: {form: this.step3Form.controls.addressForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.step3Form.controls.addressForm = result;
        this.addressControl.setValue(`Rua ${result.controls.place.value}, ${result.controls.number.value}
          ${result.controls.neighborhood.value} - ${result.controls.city.value}-${result.controls.state.value}`);
      }
    });
  }

  submit() {
    const addressControl = this.step3Form.controls.addressForm as FormGroup;

    const data: CreateOfferModel = {
      mora_local: this.step1Form.controls.livesInLocal.value,
      restricao_sexo: this.step1Form.controls.genderRestriction.value,
      pessoas_no_local: Number(this.step1Form.controls.howManyLivesInLocal.value),
      mobiliado: this.step1Form.controls.hasFurniture.value,

      wifi: this.step2Form.controls.wifi.value,
      vaga_carro: this.step2Form.controls.parkingSpace.value,
      mesa: this.step2Form.controls.writingDesk.value,
      meals: this.step2Form.controls.mealIncluded.value,
      ar_condicionado: this.step2Form.controls.air.value,
      maquina_lavar: this.step2Form.controls.washMachine.value,
      suite: this.step2Form.controls.suite.value,
      tv: this.step2Form.controls.tv.value,

      title: this.step3Form.controls.title.value,
      price: this.step3Form.controls.price.value,
      description: this.step3Form.controls.description.value,
      cep: addressControl.controls.cep.value,
      rua: addressControl.controls.place.value,
      bairro: addressControl.controls.neighborhood.value,
      n_casa: addressControl.controls.number.value,
      cidade: addressControl.controls.city.value,
      estado: addressControl.controls.state.value,
      referencia: addressControl.controls.reference.value || '',
      imgs: this.files.map(file => file.url),
    };

    this.offerService.createOffer(data).pipe(
      tap(response => this.router.navigate(['offers/' + response.post_id])),
    ).subscribe();
  }
}
