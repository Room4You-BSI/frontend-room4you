import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-terms-and-policy',
  templateUrl: './terms-and-policy.component.html',
  styleUrls: ['./terms-and-policy.component.scss']
})
export class TermsAndPolicyComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  aceitar(){
    window.close();
  }
}
