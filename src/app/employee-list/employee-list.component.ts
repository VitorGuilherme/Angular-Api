import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  //primeira parte - criar uma propriedade para ser a coleção iterável de dados 
  listaColaboradores: any = []

  //segunda parte - a referencia de instancia da REST API
  constructor(
    public restApi: RestApiService
  ) { }
  //terceira parte - priorizando a chamada da função loadEmployees para erar uma lista no componente
  ngOnInit(): void {
    this.loadEmployees()
  }
  //quarta parte - criar a função para acessar a REST API e carregar todos os dados no componente 
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.listaColaboradores = data
    })
  }

  // quinta parte - função para acessar a REST API excluir um registro
  excluirColaborador(id:any){
    if(window.confirm('Tem certeza que deseja excluir o registro ?')){
      this.restApi.deleteEmployee(id).subscribe(data => {this.loadEmployees()})
    }
  }
}
