import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-dashboard-chef',
  templateUrl: './dashboard-chef.component.html',
  styleUrls: ['./dashboard-chef.component.css']
})
export class DashboardChefComponent implements OnInit {
plat :any={};
addPlatForm : FormGroup;
connectedUser;
plats : any;
myPlats : any =[];
messageAdd:any;
id:any;
title:any;
imagePreview:any;
  constructor(private fb : FormBuilder , 
    private platService : PlatService , private router : Router , private activatedRoute : ActivatedRoute ) { }

  ngOnInit() {
    this.addPlatForm=this.fb.group({
platName : [''],
price : [''],
description: [''],
img:['']
}) 

this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

this.id = this.activatedRoute.snapshot.paramMap.get('id');

if (this.id) {
  // edit
  this.title ='Edit Plat'
  this.platService.getPlat(this.id).subscribe(
  (data) =>{
  this.plat = data.plat
  })
} else {
 this.title ="Add Plat" 
}




this.platService.getMyPlats(this.connectedUser._id).subscribe(
  (data)=>{
  console.log(data.myPlats);
  this.myPlats = data.myPlats;


//filtrage
// for (let i = 0; i < this.plats.length; i++) {
//   if (this.plats[i].idChef == this.connectedUser._id) {
//   this.myPlats.push(this.plats[i]);  
//   }
//   }

})


// this.plats = JSON.parse(localStorage.getItem("plats") || "[]");

  }

  refresh(){
    this.router.navigate(['dashboardChef'])
  }
addPlat(){
  // let idPlat= JSON.parse(localStorage.getItem("idPlat") || "1");
  // this.plat.id = idPlat;
  // this.plat.idChef = this.connectedUser.id;
  // this.plat.ChefName = this.connectedUser.firstName+" "+this.connectedUser.lastName;
  // this.plats = JSON.parse(localStorage.getItem("plats")|| "[]");
  // this.plats.push(this.plat);
if (this.id) {
  this.platService.updatePlat(this.plat).subscribe(
    (data)=> {
      console.log(data.message);
      
    }
  )
} else {
  

  this.plat.idChef=this.connectedUser._id;
  // localStorage.setItem("plats",JSON.stringify(this.plats));
  // localStorage.setItem("idPlat", idPlat + 1);
  this.platService.addPlat(this.plat, this.addPlatForm.value.img).subscribe(
    (data)=>{
      console.log(data.message);
      this.messageAdd = data.message;
    })  
  
}
}
deletePlat(id:any){
  this.platService.deletePlat(id).subscribe(
 (data)=>{console.log(data.message);

this.platService.getMyPlats(this.connectedUser._id).subscribe(
  (data)=>{
  console.log(data.myPlats);
  this.myPlats = data.myPlats;
})

 }
  )

  
}  

  displayPlat(id:any){
    this.router.navigate([`displayPlat/${id}`]);
    }
editPlat(id:any){
  this.router.navigate([`editPlat/${id}`]);

}

onImageSelected(event: Event) {
  //Selection du fichier
  const file = (event.target as HTMLInputElement).files[0];
  // Ajout d'un attribut img dans l'objet Chef
  this.addPlatForm.patchValue({ img: file });
  // Mise à jour des valeurs du form
  this.addPlatForm.updateValueAndValidity();
  // Creation d'une variable reader pour lire le contenu de fichiers
  const reader = new FileReader();
  //Déclenchement du event load lors d'une lecture de fichier avec succès
  reader.onload = () => {
  //affecter le résultat de la lecture dans la variable imagePreview
  this.imagePreview = reader.result as string
  };
  // lecture du contenu du fichier Blob ou File
  reader.readAsDataURL(file);
  }
}
