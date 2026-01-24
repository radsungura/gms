import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSavings } from './edit-savings';

describe('EditSavings', () => {
  let component: EditSavings;
  let fixture: ComponentFixture<EditSavings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSavings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSavings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
