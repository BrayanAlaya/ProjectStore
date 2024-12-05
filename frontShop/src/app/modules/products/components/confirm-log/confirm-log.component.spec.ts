import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogComponent } from './confirm-log.component';

describe('ConfirmLogComponent', () => {
  let component: ConfirmLogComponent;
  let fixture: ComponentFixture<ConfirmLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmLogComponent]
    });
    fixture = TestBed.createComponent(ConfirmLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
