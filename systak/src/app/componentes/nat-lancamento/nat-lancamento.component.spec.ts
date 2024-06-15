import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatLancamentoComponent } from './nat-lancamento.component';

describe('NatLancamentoComponent', () => {
  let component: NatLancamentoComponent;
  let fixture: ComponentFixture<NatLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NatLancamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NatLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
