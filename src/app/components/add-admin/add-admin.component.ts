import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  // déclaration des variables avant le contructor

  // étape 1 
  user:any={};
// etape 2
addAdminForm : FormGroup;
id:any;
title:any;
users:any;
// etape 3 
constructor(private formbuilder : FormBuilder , private activatedRoute : ActivatedRoute ,
private userService : UserService ) { }

  ngOnInit() {

    this.addAdminForm = this.formbuilder.group({
firstName : [''],
lastName : [''],
email : [''],
password : [''],
confirmPassword : [''],
phone : [''],  
  })

  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  if (this.id){
    //edit
this.title = "Edit User"
// this.users =JSON.parse(localStorage.getItem("users") || "[]");

// for (let i = 0; i < this.users.length; i++) {
// if (this.users[i].id ==this.id) {
//   this.user = this.users[i];  
// }
    
// }
this.userService.getUser(this.id).subscribe(
(data)=>{this.user = data.user ;
}

)
  }else{
    //add
this.title = "Add Admin"

}

}



addAdmin(){
  if (this.id) {
    //edit
// for (let i = 0; i < this.users.length; i++) {
//  if (this.user.id == this.users[i].id) {
//  this.users[i] = this.user;  
//  }   
// }  

// localStorage.setItem("users",JSON.stringify(this.users));
this.userService.updateUser(this.user).subscribe(
(data)=>{
console.log(data.message);

}
)

  } else {
    //add
//     console.log(this.user);
this.user.role ="admin";
// console.log(this.user);

// let idUser= JSON.parse(localStorage.getItem("idUser") || "1");
// this.user.id = idUser;
// let users = JSON.parse(localStorage.getItem("users")|| "[]");
// users.push(this.user);
// localStorage.setItem("users",JSON.stringify(users));
// localStorage.setItem("idUser", idUser + 1);
this.userService.createUser(this.user).subscribe(
(data)=>{
  console.log(data.message);
})

}
}
}
