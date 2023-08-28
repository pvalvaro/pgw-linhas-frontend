import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPassagemComponent } from './consultar-passagem.component';

describe('ConsultarPassagemComponent', () => {
  let component: ConsultarPassagemComponent;
  let fixture: ComponentFixture<ConsultarPassagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPassagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPassagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
