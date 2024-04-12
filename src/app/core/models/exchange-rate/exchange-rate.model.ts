import {IExchangeRate} from './exchange-rate.interface';

export class ExchangeRate implements IExchangeRate {
  constructor(
    public base: string,
    public target: string,
    public rate: number
  ) {
  }

  toString(): string {
    return `1 ${this.base} = ${this.rate.toFixed(2)} ${this.target}`;
  }
}
