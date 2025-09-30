import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBorrow } from './edit-borrow';

describe('EditBorrow', () => {
  let component: EditBorrow;
  let fixture: ComponentFixture<EditBorrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBorrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBorrow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
