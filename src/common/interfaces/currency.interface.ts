// Интерфейс одной валютной единицы
export interface CurrencyI {
  numCode: string;
  charCode: string;
  nominal: number;
  name: string;
  value: number;
  previous: number;
}
