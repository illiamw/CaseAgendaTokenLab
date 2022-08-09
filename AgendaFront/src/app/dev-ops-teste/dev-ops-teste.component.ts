import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { DevOpsTesteService } from './dev-ops-teste.service';


@Component({
  selector: 'app-dev-ops-teste',
  templateUrl: './dev-ops-teste.component.html',
  styleUrls: ['./dev-ops-teste.component.sass']
})
export class DevOpsTesteComponent implements OnInit {

  Teste : User = {nome: "eilliam", sobrenome: "Ferreira"}
  constructor(private service: DevOpsTesteService) { }

  ngOnInit(): void {
    this.service.teste().subscribe(data => this.Teste = data)
  }

}
