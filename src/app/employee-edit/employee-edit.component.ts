import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  //primeira parte - Criar uma cópia(tirar uma foto) da rota pela qual os dados circularam 
  id = this.actRoute.snapshot.params['id']
  dadosRegistro: any = {}


  //segunda parte - criar as referências de instancia
  constructor(
    public actRoute: ActivatedRoute,
    public router: Router,
    public restApi: RestApiService
  ) { }


  ngOnInit(): void {
    this.restApi.getEmployee(this.id).subscribe((data: any) => {
      this.dadosRegistro = data
    })
  }



//quarta parte - criar uma função para acessar a REST API e usar o método para atualizar o registro
atualizacaoRegistro(){
  if (window.confirm('Tem certeza que deseja alterar registro? ')) {
    this.restApi.updateEmployee(this.id, this.dadosRegistro).subscribe
    (
      () => this.router.navigate(['/employees-list'])
    )
  }
}
}
