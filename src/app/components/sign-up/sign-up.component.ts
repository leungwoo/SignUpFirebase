import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmpassword = control.get('confirmpassword')?.value;

  if(password && confirmpassword && password !== confirmpassword) {
    return {
      passwordsDontMatch:true
    }
  } 
  return null;
};
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup ({
    name:new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',[Validators.required])

  },{validators:passwordMatchValidator()});
  constructor(private authService:AuthenticationService, private router:Router, private toast:HotToastService) {}

  ngOnInit(): void {}

  get name(){
   return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmpassword(){
    return this.signUpForm.get('confirmpassword');
  }
  onSubmit(){
    if(this.signUpForm.invalid){
      return;
    }
    const {name, email, password}=this.signUpForm.value;
    this.authService.signUp(name,email,password).pipe(
      this.toast.observe({
        success:'Congrats you are Signed Up!',
      loading:'Signning you up..',
    error:'Sorry there was an error '
  })
    ).subscribe(()=>{
      this.router.navigateByUrl('/home')
    })
  }
}
