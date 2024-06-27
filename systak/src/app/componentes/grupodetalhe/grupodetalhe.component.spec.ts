import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupodetalheComponent } from './grupodetalhe.component';

describe('GrupodetalheComponent', () => {
  let component: GrupodetalheComponent;
  let fixture: ComponentFixture<GrupodetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupodetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupodetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
