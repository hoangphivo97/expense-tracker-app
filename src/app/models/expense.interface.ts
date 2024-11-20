export interface ExpenseList {
    id: string;
    date: string;
    description: string;
    purpose: string;
    paid: string;
    for?: string;
    amount: number;
    // budget: number;
    // remainBalance: number;
}

export interface createExpense extends Omit<ExpenseList, "id">{
    
}

export interface editExpenseData extends createExpense {
    
}