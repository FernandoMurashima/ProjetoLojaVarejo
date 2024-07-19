import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteProdutoComponent } from './teste-produto.component';

describe('TesteProdutoComponent', () => {
  let component: TesteProdutoComponent;
  let fixture: ComponentFixture<TesteProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesteProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesteProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
