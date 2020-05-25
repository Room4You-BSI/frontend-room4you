import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomFilterComponent } from './bottom-filter.component';

describe('BottomFilterComponent', () => {
  let component: BottomFilterComponent;
  let fixture: ComponentFixture<BottomFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
