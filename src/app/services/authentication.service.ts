import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { from,switchMap } from 'rxjs';

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
  signUp(name:string, email:string, password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(switchMap(({user})=>updateProfile(user,{displayName:name})));
  }
}
//converted to a observable with 'from'