import { createExpense } from "./expense.interface";

export interface DialogData {
    title: string;
    action: string;
    isSuccess: boolean;
    data?: createExpense;
}