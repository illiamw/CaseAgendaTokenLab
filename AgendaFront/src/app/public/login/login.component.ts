import { Alert } from './../../class/alerts';
import { User } from './../../class/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/guard/login-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  alert : Alert | null = null
  // Formulario de criação de usuario
  LoginUser = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private login: LoginServiceService) { }

  ngOnInit() {
  }

  //Submit form
  onSubmit(data: User | any) {

    if(this.LoginUser.valid){
      // Instanciando Usuario
      let user = new User(
        '', // Nome vazio aguardando login
        '', // SobreNome vazio aguardando login
        data.email,
        data.password)
        console.log(user);

      // Requisição HTTP
      this.login.login(user).subscribe(
      (data: Alert | any) =>{
        console.log(data);
        // Observando notificação
        if(data.info != null){
          this.alert = new Alert(data.info, 0)
        }

        this.login.setSession(data)


      }, (error) =>{
        this.alert = new Alert(error.error.info, 1)
      })
    }

  }

}
