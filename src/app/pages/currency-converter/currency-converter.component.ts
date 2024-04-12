import {Component, OnInit} from '@angular/core';
import {ICurrency} from '../../core/models/currency/currency.interface';
import {CurrencyList} from '../../core/utils/currency-list.util';
import {ExchangeRateService} from '../../core/services/exchange-rate/exchange-rate.service';
import {IExchangeRate} from '../../core/models/exchange-rate/exchange-rate.interface';
import {ExchangeRate} from '../../core/models/exchange-rate/exchange-rate.model';
import {createNumberMask} from 'text-mask-addons';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {


  baseAmount = '1';
  targetAmount = '';
  currencyList: ICurrency[] = CurrencyList;
  baseCurrency: ICurrency = this.currencyList[0];
  targetCurrency: ICurrency = this.currencyList[1];
  exchangeRate: IExchangeRate = new ExchangeRate('USD', 'EUR', 1);
  baseMask: any;
  targetMask: any;

  constructor(private exchangeRateService: ExchangeRateService) {
  }

  ngOnInit(): void {
    this.getExchangeRate();
    this.setBaseMask();
    this.setTargetMask();
  }

  private setBaseMask(): void {
    this.baseMask = {
      guide: true,
      mask: createNumberMask({
        prefix: this.baseCurrency.symbol,
        suffix: '',
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
        prefix: this.targetCurrency.symbol,
        suffix: '',
        allowDecimal: true,
        allowNegative: false,
        decimalLimit: 2
      })
    };
  }

  swap(): void {
    const swapCurrency = this.targetCurrency;
    const swapAmount = this.targetAmount;
    this.targetCurrency = this.baseCurrency;
    this.targetAmount = this.baseAmount;
    this.baseCurrency = swapCurrency;
    this.baseAmount = swapAmount;
    this.getExchangeRate();
    this.setBaseMask();
    this.setTargetMask();
  }

  calculateBase(): void {
    this.baseAmount = (+this.targetAmount / this.exchangeRate.rate).toString();
  }

  calculateTarget(): void {
    this.targetAmount = (+this.baseAmount * this.exchangeRate.rate).toString();
  }

  getExchangeRate(): void {
    this.exchangeRateService.getExchangeRate(this.baseCurrency.code, this.targetCurrency.code)
      .subscribe((exchangeRate: IExchangeRate) => {
        this.exchangeRate = exchangeRate;
        this.calculateTarget();
      });
  }

  baseCurrencyChanged(): void {
    this.getExchangeRate();
    this.setBaseMask();
  }

  targetCurrencyChanged(): void {
    this.getExchangeRate();
    this.setTargetMask();
  }

  compareOptions(o1: ICurrency, o2: ICurrency): boolean {
    return o1.code === o2.code;
  }

}
