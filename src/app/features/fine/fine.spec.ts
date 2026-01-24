import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fine } from './fine';

describe('Fine', () => {
  let component: Fine;
  let fixture: ComponentFixture<Fine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
