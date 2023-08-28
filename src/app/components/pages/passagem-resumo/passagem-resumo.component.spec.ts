import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagemResumoComponent } from './passagem-resumo.component';

describe('PassagemResumoComponent', () => {
  let component: PassagemResumoComponent;
  let fixture: ComponentFixture<PassagemResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassagemResumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassagemResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
