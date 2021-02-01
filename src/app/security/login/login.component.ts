import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    //formArrayExample: new FormArray([new FormControl('', [Validators.required])])
  });

  hide = true;

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn() === true) {
      this.router.navigate(['/'])
    }
  }

  login() {
    this.loginService.login(this.loginForm.value.username,
                            this.loginForm.value.password)
                              .subscribe(user => {
                                console.log(user);
                                  if (user !== undefined && user !== null) {
                                    this.notificationService.notify('Bem vindo(a) ' + user.name);
                                    this.router.navigate(['/']);
                                  } else {
                                    this.notificationService.notify('Houve uma falha na sua solicitação. Tente novamente, e contate a TI em caso de persistencia.');
                                  }
                                },
                                response =>{
                                  console.log(response);
                                  this.notificationService.notify(response.error.error_description);
                                }
                              );
  }

}
