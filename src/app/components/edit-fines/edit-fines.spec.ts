import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFines } from './edit-fines';

describe('EditFines', () => {
  let component: EditFines;
  let fixture: ComponentFixture<EditFines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFines);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
