import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should priceTo not to be less than priceFrom', () => {
    fixture.detectChanges();
    const inputFrom = fixture.debugElement.query(By.css('#priceFrom'));
    const inputTo = fixture.debugElement.query(By.css('#priceTo'));

    component.priceFrom.setValue('500');
    component.priceTo.setValue('400');
    inputTo.nativeElement.dispatchEvent(new Event('focusout'));
    expect(component.priceTo.value).toEqual('500');

    component.priceFrom.setValue('700');
    component.priceTo.setValue('600');
    inputFrom.nativeElement.dispatchEvent(new Event('focusout'));
    expect(component.priceTo.value).toEqual('700');
  });
});
