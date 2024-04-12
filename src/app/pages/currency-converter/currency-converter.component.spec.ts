import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CurrencyConverterComponent} from './currency-converter.component';
import {ExchangeRateService} from '../../core/services/exchange-rate/exchange-rate.service';
import {ExchangeRate} from '../../core/models/exchange-rate/exchange-rate.model';
import {ICurrency} from '../../core/models/currency/currency.interface';
import {CurrencyList} from '../../core/utils/currency-list.util';
import {of} from 'rxjs';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let exchangeRateServiceSpy: jasmine.SpyObj<ExchangeRateService>;
  const currencyList: ICurrency[] = CurrencyList;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ExchangeRateService', ['getExchangeRate']);
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [CurrencyConverterComponent],
      providers: [{provide: ExchangeRateService, useValue: spy}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    exchangeRateServiceSpy = TestBed.inject(ExchangeRateService) as jasmine.SpyObj<ExchangeRateService>;
    const exchangeRate: ExchangeRate = new ExchangeRate('USD', 'EUR', 0.8);
    exchangeRateServiceSpy.getExchangeRate.and.returnValue(of(exchangeRate));
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exchange rate and calculate target amount', () => {
    const exchangeRate: ExchangeRate = new ExchangeRate('USD', 'EUR', 0.8);
    exchangeRateServiceSpy.getExchangeRate.and.returnValue(of(exchangeRate));

    component.baseAmount = '1';
    component.baseCurrency = currencyList[0];
    component.targetCurrency = currencyList[1];

    component.getExchangeRate();

    expect(exchangeRateServiceSpy.getExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
    expect(component.exchangeRate).toEqual(exchangeRate);
    expect(component.targetAmount).toEqual('0.8');
  });

  it('should calculate target amount correctly', () => {
    component.baseAmount = '2';
    component.exchangeRate = new ExchangeRate('USD', 'EUR', 0.8);
    component.calculateTarget();
    expect(component.targetAmount).toEqual('1.6');
  });

  it('should calculate base amount correctly', () => {
    component.targetAmount = '3';
    component.exchangeRate = new ExchangeRate('USD', 'EUR', 0.8);
    component.calculateBase();
    expect(component.baseAmount).toEqual('3.75');
  });

  it('should swap base and target currency and amounts', () => {
    component.baseCurrency = currencyList[0];
    component.baseAmount = '1';
    const initialBaseCurrency = component.baseCurrency;
    const initialBaseAmount = component.baseAmount;
    component.targetCurrency = currencyList[1];
    component.targetAmount = '0.8';
    component.swap();
    expect(component.baseCurrency).toEqual(currencyList[1]);
    expect(component.baseAmount).toEqual('0.8');
    expect(component.targetCurrency).toEqual(initialBaseCurrency);
    expect(+component.targetAmount).toEqual((+component.baseAmount * 0.8));
  });
});
