import { createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFailure, logout } from "./auth.action";

export interface AuthState {
    token: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    token: null,
    error: null
}
export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token }) => ({
      ...state,
      token,
      error: null,
    })),
    on(loginFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(logout, (state) => ({
      ...state,
      token: null,
      error: null,
    }))
)