import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  auth: AuthService;

  constructor(private authService: AuthService, private route: Router) { }
  ngOnInit(): void {
    this.auth = this.authService;
  }

  logout() {
    this.authService.logout()
    this.route.navigate(["/login"])
  }
}
