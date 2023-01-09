import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

  export class DataService implements InMemoryDbService{

    constructor() { }
    createDb(){
  
     let  users =  [
      {  id:  1,  firstName:  'med', lastName: '7amma', email: 'c@c.com', password: '22222222', phone: '44444444', role:'admin'  },
      {  id:  2,  firstName:  'mohamed', lastName: 'ben marzouk', email: 'mm@mm.com', password: '22222222', phone: '44444444', role:'client'  },
      {  id:  3,  firstName:  'riadh', lastName: 'kawana', email: 'c@c.com', password: '22222222', dateOfBirth:'10/10/1980',experience:'10',speciality:'seaFood', role:'chef'  }
     ];
  
     return {users};
  
    }
  }

