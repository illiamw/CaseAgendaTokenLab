import { Alert } from '../../class/alerts';
import { User } from '../../class/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/guard/login-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  alert : Alert | null = null
  // Formulario de criação de usuario
  CreateUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private login: LoginServiceService) { }

  ngOnInit() {
  }

  //Submit form
  onSubmit(data: User | any) {

    if(this.CreateUser.valid){
      // Instanciando Usuario
      let user = new User(
        data.name,
        data.lastname,
        data.email,
        data.password)
        console.log(user);

      // Requisição HTTP
      this.login.create(user).subscribe(
        (data ) => {
          // Observando notificação
          if(data.info != null){
            this.alert = new Alert(data.info, 0)
          }


        },
        (error) =>{
          this.alert = new Alert(error.error.info, 1)
        }
      )
    }

  }

}
