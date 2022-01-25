// fazer todos os imports necessários
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable()

 
export class RestApiService {
  //definindo caminho para a base de dados
  apiURL: string = 'http://localhost:3000'
  // fazendo a referência de instância da classe HttpClient
  constructor(private http: HttpClient) { }

  //criar as credenciais de acesso para modificar a base de dados
  autorizacaoAcesso = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*
  =============================================================================
           CONSTRUINDO A API E SEUS RESPECTIVOS MÉTODOS
  =============================================================================
  */
  //aqui, o método vai trazer todos os dados contidos na base
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees')
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  // método para recuperar um único  resgistro da base de dados
  getEmployee(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  //método para inserir dados na base
  createEmployee(employee: any): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee),
      this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  // método para atualizar um registro - da base - por vez
  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee)
      , this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  //método de exclusão de registro
  deleteEmployee(id: any) {
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  //criando uma função para tratar erros nas aplicações front e back-end
  tratarErro(erro: any) {
    //propriedade para receber um valor textual referente ao erro ocorrido
    let mensagemErro = ''
    //verifcar qual é o local - pedaço da aplicação - onde o erro ocorre
    if (erro.error instanceof ErrorEvent) {
      //tratando o erro - se, aqui, ocorreu no front-end
      mensagemErro = erro.error.message
    } else {
      // tratando o erro - se, aqui, ocorreu no back-end
      mensagemErro = `Codigo do erro: ${erro.status}\nMensagem do erro é ${erro.message}`
    }
 //exibindo o erro numa mensagem de alerta
 window.alert(mensagemErro)
return throwError(() => mensagemErro)
 
  }
}