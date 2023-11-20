import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialFormComponent } from './tutorial-form.component';

describe('TutorialFormComponent', () => {
  let component: TutorialFormComponent;
  let fixture: ComponentFixture<TutorialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
