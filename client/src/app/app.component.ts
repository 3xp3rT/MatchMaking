import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
 users:any;
  constructor(private http:HttpClient,
              private accountService: AccountService) {}
  ngOnInit(): void {
  this.getUsers();
  this.setCurrentUser();
  }
 getUsers (){
  this.http.get('https://localhost:5001/api/users').subscribe(
    {
      next:response=> this.users =response,
      error:er=>console.log(er),
      complete:()=> console.log('request has completed')

    }
  )
 }

  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(!userString) return;
    
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
    
  }
}
