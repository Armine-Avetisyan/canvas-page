import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService) {
  }
   ngOnInit(): void {
    this.auth.loginCheck();
  }


  title = 'register-canvas-page';

  onSignOut() {
    this.auth.logout();
  }
  isLoggedIn(){
    return this.auth.isLoggedIn();
  }

}
