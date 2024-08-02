import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaProdutoComponent } from './etiqueta-produto.component';

describe('EtiquetaProdutoComponent', () => {
  let component: EtiquetaProdutoComponent;
  let fixture: ComponentFixture<EtiquetaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtiquetaProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtiquetaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
