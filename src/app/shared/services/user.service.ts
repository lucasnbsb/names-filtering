import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  client = inject(HttpClient)
  #url = 'https://jsonplaceholder.typicode.com/users'

  constructor() { }

  getUsers(): Observable<any[]>{
    return this.client.get<any[]>(this.#url)
  }
}
