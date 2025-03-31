import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
    token: string | null;
}

export function createInitialState(): AuthState {
    return {
        token: typeof  window !== 'undefined' ? localStorage.getItem('token') || null : null 
    }
}


@Injectable({providedIn: 'root'})
@StoreConfig({name: 'auth'})
export class AuthStore extends Store<AuthState> {
    constructor(){
        super(createInitialState())
    }
}