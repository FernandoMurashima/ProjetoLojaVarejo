import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueInicialComponent } from './estoque-inicial.component';

describe('EstoqueInicialComponent', () => {
  let component: EstoqueInicialComponent;
  let fixture: ComponentFixture<EstoqueInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstoqueInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstoqueInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
