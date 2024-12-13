import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { UserSettings } from '../../interface/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {


  constructor(private firestore: Firestore, private auth: Auth) {


  }

  private getUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }

  getUserSettings(): Observable<UserSettings | null> {
    const userId = this.getUserId();
    if (!userId) {
      return of(null);
    }

    const settingsRef = doc(this.firestore, `settings/${userId}`);
    return from(getDoc(settingsRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data() as UserSettings;
        }
        return null; // No settings found for user
      })
    );
  }

  createSettingsForUser(settings: UserSettings): Observable<void> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in');
    }

    // Create a reference to the "Settings" document for this user in Firestore
    const settingsRef = doc(this.firestore, `settings/${userId}`);

    // Use setDoc to create or overwrite the document
    return from(setDoc(settingsRef, settings));
  }

}

