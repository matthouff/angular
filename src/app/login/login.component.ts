import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté (pikachu/pikachu)";
  name: string;
  password: string;
  hide: boolean = true;
  auth: AuthService;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    this.message = this.authService.isLoggedIn ? "Vous êtes connecté" : "Identifiant ou mot de passe incorrect.";
  }

  login() {
    this.message = "Tentative de connexion en cours"
    this.authService.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage()
        if (isLoggedIn) {
          this.router.navigate(["/pokemons"])
        } else (
          this.password = "", // Réinitialiser le mot de passe si l'utilisateur s'est trompé
          this.router.navigate(["/login"])
        )
      })
  }

  logout() {
    this.authService.logout()
    this.message = "Vous être déconncté"
  }


  handleHide() {
    this.hide = !this.hide;
  }
}
