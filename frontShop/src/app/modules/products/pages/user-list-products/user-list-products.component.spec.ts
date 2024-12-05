import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListProductsComponent } from './user-list-products.component';

describe('ListProductsComponent', () => {
  let component: UserListProductsComponent;
  let fixture: ComponentFixture<UserListProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListProductsComponent]
    });
    fixture = TestBed.createComponent(UserListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
