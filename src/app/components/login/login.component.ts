import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginForm, ISigninForm } from 'src/app/services/product-card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login =true 
  public loginform: FormGroup;
  public loginFormValue:ILoginForm;
  public signinFormValue:ISigninForm;

  ngOnInit() {
    this.loginform = new FormGroup ({
      username: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
     ])),
    })
    
    const loginValue=sessionStorage.getItem("loginFormData")
    if(loginValue){
      this.loginFormValue=JSON.parse(loginValue)
    }
    const signinValue=sessionStorage.getItem("signinFormData")
    if(signinValue){
      this.signinFormValue=JSON.parse(signinValue)
    }
  }

  constructor(private route:Router){
  }
  
  private logininAlert(message: any) {
    Swal.fire({
      position: 'top-end',
      html: message,
      timer: 2000,
      width: '500px',
      showConfirmButton: false,
      timerProgressBar: false,
    });
  }
   
  onSubmit(){
    if(sessionStorage.getItem("signinFormData")){
      sessionStorage.setItem("loginFormData", JSON.stringify(this.loginform.value));
      sessionStorage.setItem("login", "true");
      this.onButtonClick()
    }
    else{
      this.logininAlert("SignIn First");
    }
  }
  onButtonClick(){
    if(this.loginFormValue.username===this.signinFormValue.email && this.loginFormValue.password===this.signinFormValue.password){
      this.route.navigate(['/home']);
      this.logininAlert("Successfully Logged In");
    }
    else{
      this.route.navigate(['/sigin']);
      this.logininAlert("Account doesnot exist");
    }
  }
}
