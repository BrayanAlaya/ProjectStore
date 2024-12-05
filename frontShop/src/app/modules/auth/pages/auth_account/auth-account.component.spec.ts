import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccountComponent } from './auth-account.component';

describe('AuthAccountComponent', () => {
  let component: AuthAccountComponent;
  let fixture: ComponentFixture<AuthAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAccountComponent]
    });
    fixture = TestBed.createComponent(AuthAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
