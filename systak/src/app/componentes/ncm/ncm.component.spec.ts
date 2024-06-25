import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcmComponent } from './ncm.component';

describe('NcmComponent', () => {
  let component: NcmComponent;
  let fixture: ComponentFixture<NcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NcmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
