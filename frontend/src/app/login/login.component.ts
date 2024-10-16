import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../modules/openapi/services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginEvent = new EventEmitter<boolean>()
  username: string = ""
  constructor(private loginService: LoginService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(this.cookieService.check("username")) {
      this.username = this.cookieService.get("username");
      this.onSubmit();
    }
  }

  onSubmit() {
    this.loginService.login({ username: this.username }).subscribe({
      complete: () => {
        console.log(`Logged in as ${this.username}`);
        this.loginEvent.emit(true);
        this.router.navigateByUrl("/main");
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }
}
