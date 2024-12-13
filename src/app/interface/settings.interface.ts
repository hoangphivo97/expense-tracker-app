export enum CurrencyEnum {
    VND,
    USD,
    EUR
}

export interface CurrencyDropdownList {
    name: string;
    value: CurrencyEnum
}

export interface UserSettings{
    currency: CurrencyEnum;
}