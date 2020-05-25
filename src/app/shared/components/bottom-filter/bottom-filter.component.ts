import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bottom-filter',
  templateUrl: './bottom-filter.component.html',
  styleUrls: ['./bottom-filter.component.scss']
})
export class BottomFilterComponent implements OnInit {

  expand = false;
  expand2 = false;
  expand3 = false;
  expand4 = false;
  expand5 = false;

  constructor() { }

  ngOnInit(): void {
  }

  openItem(item: string) {
    this.expand2 = false;
    this.expand3 = false;
    this.expand4 = false;
    this.expand5 = false;

    switch (item) {
      case 'expand2':
        this.expand2 = true;
        break;
      case 'expand3':
        this.expand3 = true;
        break;
      case 'expand4':
        this.expand4 = true;
        break;
      case 'expand5':
        this.expand5 = true;
        break;

    }

  }

}
