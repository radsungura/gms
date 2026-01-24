import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmfunds } from './edit-emfunds';

describe('EditEmfunds', () => {
  let component: EditEmfunds;
  let fixture: ComponentFixture<EditEmfunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmfunds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmfunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
