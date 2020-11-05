import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { AbstractTestPage } from '@shared/tests-utils/abstract-test-page.class';

import { OfferDetailsComponent } from './offer-details.component';


describe('OfferDetailsComponent', () => {
  let component: OfferDetailsComponent;
  let fixture: ComponentFixture<OfferDetailsComponent>;
  let page: Page;

  beforeEach(async(() => {
    page = new Page();

    TestBed.configureTestingModule({
      declarations: [ OfferDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: page.spies.httpClient},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailsComponent);
    page.setFixture(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(page.elements.title).toBeTruthy();
  });
});

class Page extends AbstractTestPage<OfferDetailsComponent> {
  protected setElements() {
    this.addElement('[data-testid="title"]', 'title');
  }

  protected setSpies() {
    this.spyOnClass(HttpClient);
    this.spies.httpClient.get.and.returnValue(of(true));
    this.spies.httpClient.post.and.returnValue(of(true));
  }
}
