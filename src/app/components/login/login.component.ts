import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteConfigLoadEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPassword:boolean=false;
  constructor(private authenticationService:AuthenticationService,
    private router:Router,
    private toast:HotToastService) {}
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  ngOnInit(): void {}

  public togglePasswordVisibility(){
    this.showPassword=!this.showPassword
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    const {email, password}=this.loginForm.value
    this.authenticationService.login(email,password).pipe(
      this.toast.observe({
        success:'Logged in Successfully',
        loading:'Logging in ...',
        error:'Sorry there was an error'
      })
    ).subscribe(()=>{
      this.router.navigateByUrl('/home')
    })
  }
}
