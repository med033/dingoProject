import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  id:any;
  user:any;
  
  constructor(private activatedRoute : ActivatedRoute ,
              private userService    : UserService) { }
  ngOnInit() {
  //recuperation de l'id a partir du path actuel
  
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  console.log(this.id);
  

  // let users = JSON.parse(localStorage.getItem("users") ||"[]");

  
  // for (let i = 0; i < users.length; i++) {
  
  //   if (users[i].id ==this.id) {
  //   this.user=users[i];  
  //   }
    
  // }

  this.userService.getUser(this.id).subscribe(
  (data)=>{
  this.user = data.user ;
  }
  )
console.log(this.user);
}


}
