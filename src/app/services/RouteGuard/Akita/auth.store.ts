import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
    token: string | null;
}

export function createInitialState(): AuthState {
    const isBrowser = typeof window !== 'undefined';
    return {
        token: isBrowser ? localStorage.getItem('token') || null : null
    }
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialState())
    }

    setToken(token: string | null) {
        this.update({ token });
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }
}