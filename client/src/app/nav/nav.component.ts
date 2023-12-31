import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService :AccountService) { }
  ngOnInit(): void {

  }
  login() {
    this.accountService.login(this.model)
    .subscribe(
      {
        next :(response)=> console.log(response) ,
        error:er=>console.log(er),
        complete:()=> console.log('login request has completed')

      })
  }
 
  logout(){
    this.accountService.logout();
  }
}
