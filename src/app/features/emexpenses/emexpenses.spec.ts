import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emexpenses } from './emexpenses';

describe('Emexpenses', () => {
  let component: Emexpenses;
  let fixture: ComponentFixture<Emexpenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emexpenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emexpenses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
