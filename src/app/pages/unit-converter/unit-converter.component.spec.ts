import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {UnitConverterComponent} from './unit-converter.component';
import {SharedModule} from '../../shared/shared.module';
import {UnitList} from '../../core/utils/unit-list.util';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('UnitConverterComponent', () => {
  let component: UnitConverterComponent;
  let fixture: ComponentFixture<UnitConverterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnitConverterComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnitConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate target amount correctly', () => {
    component.baseAmount = '1';
    component.baseUnit = UnitList[0];
    component.targetUnit = UnitList[1];
    component.calculateTarget();
    expect(component.targetAmount).toEqual((+component.baseAmount * component.baseUnit.cf / component.targetUnit.cf).toString());
  });

  it('should calculate base amount correctly', () => {
    component.targetAmount = '1';
    component.targetUnit = UnitList[1];
    component.baseUnit = UnitList[0];
    component.calculateBase();
    expect(component.baseAmount).toEqual((+component.targetAmount * component.targetUnit.cf / component.baseUnit.cf).toString());
  });

  it('should swap base and target unit and amounts', () => {
    const initialBaseUnit = component.baseUnit;
    const initialBaseAmount = component.baseAmount;
    component.baseUnit = UnitList[0];
    component.baseAmount = '1';
    component.targetUnit = UnitList[1];
    component.calculateTarget();
    const initialTargetAmount = component.targetAmount;
    const initialTargetUnit = component.targetUnit;
    component.swap();

    expect(component.baseUnit).toEqual(initialTargetUnit);
    expect(component.baseAmount).toEqual(initialTargetAmount);
    expect(component.targetUnit).toEqual(initialBaseUnit);
    expect(component.targetAmount).toEqual(initialBaseAmount);
  });

});
