




// describe('OfferListComponent', () => {
//   let component: OfferListComponent;
//   let fixture: ComponentFixture<OfferListComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ OfferListComponent ],
//       imports: [ RouterTestingModule, HttpClientTestingModule ],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OfferListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should priceTo not to be less than priceFrom', () => {
//     fixture.detectChanges();
//     const inputFrom = fixture.debugElement.query(By.css('#priceFrom'));
//     const inputTo = fixture.debugElement.query(By.css('#priceTo'));

//     component.priceFrom.setValue('500');
//     component.priceTo.setValue('400');
//     inputTo.nativeElement.dispatchEvent(new Event('focusout'));
//     expect(component.priceTo.value).toEqual('500');

//     component.priceFrom.setValue('700');
//     component.priceTo.setValue('600');
//     inputFrom.nativeElement.dispatchEvent(new Event('focusout'));
//     expect(component.priceTo.value).toEqual('700');
//   });
// });
