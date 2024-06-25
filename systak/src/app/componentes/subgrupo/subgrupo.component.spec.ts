import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgrupoComponent } from './subgrupo.component';

describe('SubgrupoComponent', () => {
  let component: SubgrupoComponent;
  let fixture: ComponentFixture<SubgrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubgrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubgrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
