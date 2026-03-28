import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalData } from './external-data';

describe('ExternalData', () => {
  let component: ExternalData;
  let fixture: ComponentFixture<ExternalData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
