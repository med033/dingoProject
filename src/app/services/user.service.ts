import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000";

  constructor(private httpClient : HttpClient) { }

public getUsers(){
return this.httpClient.get<{users : any}>(this.SERVER_URL + '/api/allUsers');
}

public getUser(userId){
  console.log("here in getUser from service")
  return this.httpClient.get<{user :any}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`);
}

public createUser(user: any){
  return this.httpClient.post<{message : string}>(`${this.SERVER_URL + '/api/createUser'}`, user)
}

public login(user: any){
  return this.httpClient.post<{findedUser : any}>(`${this.SERVER_URL + '/api/login'}`, user)
}

public deleteUser(userId){
  return this.httpClient.delete<{message : string}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`)
}
public updateUser(user: any){
  return this.httpClient.put<{message : string}>(`${this.SERVER_URL + '/api/allUsers'}/${user._id}`, user)
}

public getPdf(){
  return this.httpClient.get<{ message: String}>(`${this.SERVER_URL}/api/allUsers/generateFile/pdf`);
  }

  public searchChef(chef: any){
    return this.httpClient.post<{chefs : any}>(`${this.SERVER_URL + '/api/searchChef'}`, chef)
  }



}
