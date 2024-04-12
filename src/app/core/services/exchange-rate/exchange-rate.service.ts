import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IExchangeRate} from '../../models/exchange-rate/exchange-rate.interface';
import {ExchangeRate} from '../../models/exchange-rate/exchange-rate.model';

@Injectable({providedIn: 'root'})
export class ExchangeRateService {
  constructor(private http: HttpClient) {
  }

  getExchangeRate(base: string, target: string): Observable<IExchangeRate> {
    return this.http.get<any>(`https://exchange-rates.abstractapi.com/v1/live/
?api_key=2a87b831482049d5829a69d410a0e79e&base=${base}&target=${target}`).pipe(map(res => {
      const exchangeRate = new ExchangeRate(base, target, res.exchange_rates[target]);
      return exchangeRate;
    }));
  }
}
