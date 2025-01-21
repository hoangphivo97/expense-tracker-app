import { DropdownList } from "./settings.interface";

export interface ExpenseList {
    id: string;
    date: string;
    description: string;
    purpose: string;
    paid: PaidMethodEnum;
    for?: string;
    amount: number;
    // budget: number;
    // remainBalance: number;
}

export enum PaidMethodEnum {
    CASH,
    CREDIT_CARD,
    BANK_TRANSFER
}

export interface createExpense extends Omit<ExpenseList, "id"> {

}

export interface editExpense extends ExpenseList {

}

export type PaidMethodDropdownList = DropdownList<PaidMethodEnum>
