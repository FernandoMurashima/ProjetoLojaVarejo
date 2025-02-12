import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasPorVendedorComponent } from './vendas-por-vendedor.component';

describe('VendasPorVendedorComponent', () => {
  let component: VendasPorVendedorComponent;
  let fixture: ComponentFixture<VendasPorVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendasPorVendedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendasPorVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
