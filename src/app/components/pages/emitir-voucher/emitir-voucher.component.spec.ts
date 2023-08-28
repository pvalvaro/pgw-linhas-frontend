import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirVoucherComponent } from './emitir-voucher.component';

describe('EmitirVoucherComponent', () => {
  let component: EmitirVoucherComponent;
  let fixture: ComponentFixture<EmitirVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmitirVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmitirVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
