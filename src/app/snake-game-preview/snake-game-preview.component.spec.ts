import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGamePreviewComponent } from './snake-game-preview.component';

describe('SnakeGamePreviewComponent', () => {
  let component: SnakeGamePreviewComponent;
  let fixture: ComponentFixture<SnakeGamePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakeGamePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeGamePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
