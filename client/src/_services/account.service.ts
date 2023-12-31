import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  login(model: User) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response:User)=> {
        var user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user))
          this.setCurrentUser(user);
        }
      })
    )
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
  logout(){
  localStorage.removeItem("user");
  this.currentUserSource.next(null);
  }
}
