import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedCalcPage } from './med-calc.page';

describe('MedCalcPage', () => {
  let component: MedCalcPage;
  let fixture: ComponentFixture<MedCalcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
