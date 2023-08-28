import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharVooComponent } from './detalhar-voo.component';

describe('DetalharVooComponent', () => {
  let component: DetalharVooComponent;
  let fixture: ComponentFixture<DetalharVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharVooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
