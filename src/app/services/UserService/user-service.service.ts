import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { CurrencyAPIObject } from '../../modal/settings-modal/settings-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  api = 'https://open.er-api.com/v6/latest/'

  private http = inject(HttpClient)

  constructor() {

  }

  getCurrencyExchange(baseCurrency: string): Observable<CurrencyAPIObject> {
    return from(this.http.get<CurrencyAPIObject>(`${this.api}${baseCurrency}`))
  }

  

}
