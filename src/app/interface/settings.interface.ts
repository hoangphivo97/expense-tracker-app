export enum CurrencyEnum {
    VND,
    USD,
    EUR
}

export interface DropdownList<T> {
    name: string;
    value: T
}

export interface UserSettings{
    currency: CurrencyEnum;
}

export type CurrencyDropdownList = DropdownList<CurrencyEnum>

export type DateFormatDropdownList = DropdownList<string>

