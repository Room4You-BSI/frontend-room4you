import { Component, Input, OnInit } from '@angular/core';

import { AuthorModel } from '@shared/models';


@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.scss']
})
export class OwnerCardComponent implements OnInit {

  @Input() authorData: AuthorModel;
  @Input() price: number;

  emailSubject = '';
  emailBody = '';

  constructor() {}

  ngOnInit(): void {
  }

  openEmail(email) {
    window.location.href = `mailto:${email}?subject=${this.emailSubject}&body=${this.emailBody}`;
  }
}
