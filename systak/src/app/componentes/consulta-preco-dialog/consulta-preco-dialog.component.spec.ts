import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPrecoDialogComponent } from './consulta-preco-dialog.component';

describe('ConsultaPrecoDialogComponent', () => {
  let component: ConsultaPrecoDialogComponent;
  let fixture: ComponentFixture<ConsultaPrecoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaPrecoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaPrecoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
