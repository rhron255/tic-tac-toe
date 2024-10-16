import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  username: string = "";

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.username = this.cookieService.get("username")
  }
}
