import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/guard/login-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  constructor(private auth:LoginServiceService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout()
  }

}
