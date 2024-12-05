import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHitorialComponent } from './sales-hitorial.component';

describe('SalesHitorialComponent', () => {
  let component: SalesHitorialComponent;
  let fixture: ComponentFixture<SalesHitorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesHitorialComponent]
    });
    fixture = TestBed.createComponent(SalesHitorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
