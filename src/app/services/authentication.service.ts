import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth:Auth) {}
   currentUser$= authState(this.auth); //observable returns a user
   
  login(username:string,password:string){
    return from(signInWithEmailAndPassword(this.auth,username,password));
  }
  logout(){
    return from(this.auth.signOut());
  }
}
//converted to a observable with 'from'