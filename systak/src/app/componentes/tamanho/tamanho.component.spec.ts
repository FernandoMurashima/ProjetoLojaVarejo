import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanhoComponent } from './tamanho.component';

describe('TamanhoComponent', () => {
  let component: TamanhoComponent;
  let fixture: ComponentFixture<TamanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TamanhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TamanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
