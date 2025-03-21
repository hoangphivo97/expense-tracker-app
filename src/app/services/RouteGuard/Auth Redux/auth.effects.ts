import { Actions, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { createEffect } from "@ngrx/effects";
import { login, loginFailure, loginSuccess } from "./auth.action";
import { catchError, map, of, switchMap } from "rxjs";

export class AuthEffects {
    constructor(private action$: Actions, private authService: AuthService) { }

    login$ = createEffect(() => this.action$.pipe(
        ofType(login),
        switchMap(({ username, password }) => {
            return this.authService.signInWithAdminAccount(username, password).pipe(
                map((response) => loginSuccess({ token: response.token })),
                catchError((error) => of(loginFailure({ error: error.message })))
            )
        })
    ))
}