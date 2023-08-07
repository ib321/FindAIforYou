import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAiComponent } from './list-ai.component';

describe('ListAiComponent', () => {
  let component: ListAiComponent;
  let fixture: ComponentFixture<ListAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
