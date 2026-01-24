import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsGroup } from './details-group';

describe('DetailsDoc', () => {
  let component: DetailsGroup;
  let fixture: ComponentFixture<DetailsGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
