import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { tap } from 'rxjs/operators';

import { CepService } from '@shared/services/cep.service';


export interface DialogData {
  form: FormGroup;
}

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {

  private readonly mobileSizeTxt = '(max-width: 549.99px)';
  mobileSize = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialogRef: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cepService: CepService,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      this.mobileSizeTxt,
    ]).pipe(tap(result => {
      this.mobileSize = result.breakpoints[this.mobileSizeTxt];
    })).subscribe();

    this.data.form.controls.cep.valueChanges.pipe(
      tap(value => {
        if (!value || (value.replace(/[^0-9]/, '')).length !== 8) { return; }
        this.cepService.searchCep(value.replace(/[^0-9]/, '')).pipe(
          tap(response => {
            this.data.form.controls.place.setValue(response.logradouro);
            this.data.form.controls.neighborhood.setValue(response.bairro);
            this.data.form.controls.city.setValue(response.localidade);
            this.data.form.controls.state.setValue(response.uf);
          })
        ).subscribe();
      })
    ).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm(): void {
    this.data.form.markAsTouched();
    this.data.form.markAsDirty();
    if (!this.data.form.valid) {
      return;
    }
    this.dialogRef.close(this.data.form);
  }
}
