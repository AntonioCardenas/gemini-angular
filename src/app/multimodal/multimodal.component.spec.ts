import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimodalComponent } from './multimodal.component';

describe('MultimodalComponent', () => {
  let component: MultimodalComponent;
  let fixture: ComponentFixture<MultimodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultimodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
