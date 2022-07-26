import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessActionComponent } from './success-action.component';

describe('SuccessActionComponent', () => {
  let component: SuccessActionComponent;
  let fixture: ComponentFixture<SuccessActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
