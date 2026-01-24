import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRefunds } from './edit-refunds';

describe('EditRefunds', () => {
  let component: EditRefunds;
  let fixture: ComponentFixture<EditRefunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRefunds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRefunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
