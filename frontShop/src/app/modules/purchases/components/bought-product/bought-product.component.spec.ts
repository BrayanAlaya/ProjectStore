import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtProductComponent } from './bought-product.component';

describe('BoughtProductComponent', () => {
  let component: BoughtProductComponent;
  let fixture: ComponentFixture<BoughtProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoughtProductComponent]
    });
    fixture = TestBed.createComponent(BoughtProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
