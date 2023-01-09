import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  
//declaration des variables globales
addChefform: FormGroup;
id: any;
chef: any={};
title:any;
user:any;
users : any={};
  constructor(private fb: FormBuilder, private activatedRoute : ActivatedRoute ,
    private userService : UserService ) { }

  ngOnInit() { 
this.addChefform= this.fb.group({
firstname:[''],
lastName:[''],
email:[''],
password:[''],
speciality:[''],
experience:[''],
dateOfBirth:[''],
 })
this.id= this.activatedRoute.snapshot.paramMap.get('id');

if (this.id) {
  //edit
  this.title = "Edit CHef";
  // this.users = JSON.parse(localStorage.getItem("users") || "[]");

  // for (let i = 0; i < this.users.length; i++) {
  //  if (this.users[i].id ==this.id) {
  //   this.chef = this.users[i];  
  //  }
this.userService.getUser(this.id).subscribe(
  (data) =>{ this.chef = data.user ;

  }
)    
  // }
} else {
  //add
  this.title = "Add Chef";
}

}






addChef() {

if (this.id) {
// //edit
// for (let i = 0; i < this.users.length; i++) {
//   if (this.chef.id == this.users[i].id) {
//   this.users[i] = this.chef;  
//   }   
//  }  
 this.userService.updateUser(this.chef).subscribe(
(data) => {
console.log(data.message);
});

}else{
//  localStorage.setItem("users",JSON.stringify(this.users));
  
// } else {

// console.log(this.chef);
// if (this.chef.firstName.length <5 ) {
// }



// let idChef= JSON.parse(localStorage.getItem("idUser") || "1");
// this.chef.id = idChef;
this.chef.role= "chef";
// let users = JSON.parse(localStorage.getItem("users")|| "[]");
// users.push(this.chef);
// localStorage.setItem("users",JSON.stringify(users));
// localStorage.setItem("idUser", idChef + 1);
  
// }
this.userService.createUser(this.chef).subscribe(
  (data)=>{
    console.log(data.message);
  })
}

}

}
