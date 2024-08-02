import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AberturapdvComponent } from './aberturapdv.component';

describe('AberturapdvComponent', () => {
  let component: AberturapdvComponent;
  let fixture: ComponentFixture<AberturapdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AberturapdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AberturapdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
