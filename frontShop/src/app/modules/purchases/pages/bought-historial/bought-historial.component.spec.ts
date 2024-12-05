import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtHistorialComponent } from './bought-historial.component';

describe('BoughtHistorialComponent', () => {
  let component: BoughtHistorialComponent;
  let fixture: ComponentFixture<BoughtHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoughtHistorialComponent]
    });
    fixture = TestBed.createComponent(BoughtHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
