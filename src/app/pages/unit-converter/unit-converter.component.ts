import {Component, OnInit} from '@angular/core';
import {IUnit} from '../../core/models/unit/unit.interface';
import {UnitList} from '../../core/utils/unit-list.util';
import {createNumberMask} from 'text-mask-addons';

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent implements OnInit {

  baseAmount = '1';
  targetAmount = '';
  unitList: IUnit[] = UnitList;
  baseUnit: IUnit = this.unitList[0];
  targetUnit: IUnit = this.unitList[1];
  baseMask: any;
  targetMask: any;

  constructor() {
  }

  ngOnInit(): void {
    this.calculateTarget();
    this.setBaseMask();
    this.setTargetMask();
  }

  private setBaseMask(): void {
    this.baseMask = {
      guide: true,
      mask: createNumberMask({
        prefix: '',
        suffix: ' ' + this.baseUnit.symbol,
        allowDecimal: true,
        allowNegative: false,
        decimalLimit: 2
      })
    };
  }

  private setTargetMask(): void {
    this.targetMask = {
      guide: true,
      mask: createNumberMask({
        prefix: '',
        suffix: ' ' + this.targetUnit.symbol,
        allowDecimal: true,
        allowNegative: false,
        decimalLimit: 2
      })
    };
  }

  swap(): void {
    const swapUnit = this.targetUnit;
    const swapAmount = this.targetAmount;
    this.targetUnit = this.baseUnit;
    this.targetAmount = this.baseAmount;
    this.baseUnit = swapUnit;
    this.baseAmount = swapAmount;
    this.setBaseMask();
    this.setTargetMask();
  }

  calculateBase(): void {
    this.baseAmount = (+this.targetAmount * this.targetUnit.cf / this.baseUnit.cf).toString();
  }

  baseUnitChanged(): void {
    this.calculateTarget();
    this.setBaseMask();
  }

  calculateTarget(): void {
    this.targetAmount = (+this.baseAmount * this.baseUnit.cf / this.targetUnit.cf).toString();
  }

  targetUnitChanged(): void {
    this.calculateTarget();
    this.setTargetMask();
  }

  compareOptions(o1: IUnit, o2: IUnit): boolean {
    return o1.unitName === o2.unitName;
  }
}
