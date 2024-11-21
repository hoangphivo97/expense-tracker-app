import { createExpense, editExpense } from "./expense.interface";

export interface DialogData {
    title: string;
    action: DialogActionEnum;
    isSuccess: boolean;
    data?: editExpense | string;
    content?: string;
}

export enum DialogActionEnum {
    Create,
    Edit,
    Delete
}