import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoVoosComponent } from './gestao-voos.component';

describe('GestaoVoosComponent', () => {
  let component: GestaoVoosComponent;
  let fixture: ComponentFixture<GestaoVoosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoVoosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoVoosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
