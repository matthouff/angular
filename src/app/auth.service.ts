import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == "pikachu" && password == "pikachu");

    return of(isLoggedIn).pipe( // of(isLoggedIn) permet de récupérer le résultat avec l'Observable (of)
      delay(1000), // Simuler un délais de 1sec
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn) // ensuite on effectu une action en attribuant la nouvelle valeur à isLoggedIn
    )
  }

  logout() {
    this.isLoggedIn = false;
  }
}
