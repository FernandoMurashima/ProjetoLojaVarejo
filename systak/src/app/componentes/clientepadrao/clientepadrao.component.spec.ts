import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientepadraoComponent } from './clientepadrao.component';

describe('ClientepadraoComponent', () => {
  let component: ClientepadraoComponent;
  let fixture: ComponentFixture<ClientepadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientepadraoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientepadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
