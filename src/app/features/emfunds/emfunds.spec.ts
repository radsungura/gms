import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emfunds } from './emfunds';

describe('Emfunds', () => {
  let component: Emfunds;
  let fixture: ComponentFixture<Emfunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emfunds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emfunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
