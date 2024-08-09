import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaProdutoLojaComponent } from './etiqueta-produto-loja.component';

describe('EtiquetaProdutoLojaComponent', () => {
  let component: EtiquetaProdutoLojaComponent;
  let fixture: ComponentFixture<EtiquetaProdutoLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtiquetaProdutoLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtiquetaProdutoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
