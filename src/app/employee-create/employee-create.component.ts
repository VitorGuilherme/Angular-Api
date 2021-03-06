import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
// primeira parte - criando a propriedade que receberá os dados
  @Input() employeeDetails = {
    name: '',
    email: '',
    phone: ''
  }

// segunda parte - definindo as referencias de instancia no construtor
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

// terceira parte - criar uma funcao para acessar o metodo da REST API para armazenar um registro
  addEmployee(){
    this.restApi.createEmployee(this.employeeDetails).subscribe((data:{}) => {
      this.router.navigate(['/employee-list'])
    })
  }
  
}