import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedTripsComponent } from './customized-trips.component';

describe('CustomizedTripsComponent', () => {
  let component: CustomizedTripsComponent;
  let fixture: ComponentFixture<CustomizedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
