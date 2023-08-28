import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarVooComponent } from './alterar-voo.component';

describe('AlterarVooComponent', () => {
  let component: AlterarVooComponent;
  let fixture: ComponentFixture<AlterarVooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarVooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
