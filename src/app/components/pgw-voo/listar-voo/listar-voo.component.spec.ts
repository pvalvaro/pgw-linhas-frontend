import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVooComponent } from './listar-voo.component';

describe('ListarVooComponent', () => {
  let component: ListarVooComponent;
  let fixture: ComponentFixture<ListarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
