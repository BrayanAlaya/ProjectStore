import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderComponent } from './vender.component';

describe('VenderComponent', () => {
  let component: VenderComponent;
  let fixture: ComponentFixture<VenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenderComponent]
    });
    fixture = TestBed.createComponent(VenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
