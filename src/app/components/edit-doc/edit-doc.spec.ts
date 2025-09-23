import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoc } from './edit-doc';

describe('EditDoc', () => {
  let component: EditDoc;
  let fixture: ComponentFixture<EditDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
