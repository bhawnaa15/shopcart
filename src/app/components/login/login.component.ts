import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginform: FormGroup;

  ngOnInit() {
    this.loginform = new FormGroup ({
      username: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        //first letter capital and should only contain numbers and letters
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') 
     ])),
    })
  }
      
}
