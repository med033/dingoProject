import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-dashboard-admin",
  templateUrl: "./dashboard-admin.component.html",
  styleUrls: ["./dashboard-admin.component.css"],
})
export class DashboardAdminComponent implements OnInit {
  users: any;
  adminsClients: any = [];
  chefs: any = [];
  plats: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private platservice: PlatService
  ) {}

  ngOnInit() {
    // this.users = JSON.parse(localStorage.getItem("users") || "[]");
    this.userService.getUsers().subscribe((data) => {
      console.log(data.users);
      this.users = data.users;

      // for (let i = 0; i < this.users.length; i++) {
      //   if ((this.users[i].role=="admin")|| (this.users[i].role=="client")) {
      //   this.adminsClients.push(this.users[i]);
      //   }else{
      //   this.chefs.push(this.users[i]);
      //   }

      //   }
    });

    this.platservice.getPlats().subscribe((data) => {
      console.log(data.plats);
      this.plats = data.plats;
    });

    // this.plats = JSON.parse(localStorage.getItem("plats") || "[]");
    // for (let i = 0; i < this.plats.length; i++) {
    // let chef = this.searchById(this.plats[i].idChef,'users');
    // console.log('chef',chef);

    // this.plats[i].chefName = chef.firstName+" "+chef.lastName ;
    // }

    // console.log("admins & cients",this.adminsClients);
    // console.log("chefs",this.chefs);
  }

  displayUser(id: any) {
    this.router.navigate([`displayUser/${id}`]);
  }

  editUser(id: any, role: any) {
    if (role == "admin" || role == "client") {
      this.router.navigate([`editUser/${id}`]);
    } else {
      this.router.navigate([`editChef/${id}`]);
    }
  }
  //       deleteUser(id:any){
  //         let pos;
  // for (let i = 0; i < this.users.length; i++) {
  // if (this.users[i].id==id) {
  //   pos = i ;
  // }
  // }
  // let Tab: any[];
  // if (this.users[pos].role=="chef" ) {
  //   for (let i = 0; i < this.plats.length; i++) {
  //   if (this.plats[i].idChef!=id) {
  // Tab.push(this.plats[i])

  //     }
  //     // this.plats.splice(index,1);
  //     }
  //     }

  // this.users.splice(pos,1);
  // localStorage.setItem("users",JSON.stringify(this.users));
  // localStorage.setItem("plats",JSON.stringify(Tab));

  //       }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log(data.message);
      this.userService.getUsers().subscribe((data) => {
        this.users = data.users;
      });
    });
  }
  // editChef(id:any){
  //
  // }

  // searchById(id,key){
  //   let tab = JSON.parse(localStorage.getItem(key) || "[]");
  //   let obj;
  //   for (let i = 0; i < tab.length; i++) {
  //     if (tab[i].id == id) {
  //       obj=tab[i];

  //     }
  //   }
  //   return obj;
  // }

  getcolor(role) {
    switch (role) {
      case "admin":
        return "green";
        break;

      case "client":
        return "blue";
        break;

      case "chef":
        return "red";
        break;
    }
  }
  // reloadComponent() {
  //   let currentUrl = this.router.url;
  //   // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
  //   // pour un re-rendu à une date ultérieure.
  //   //*****mettre en cache */
  //       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //       //gerer une demande navigation vers l'url actuel
  //       this.router.onSameUrlNavigation = 'reload';
  //       this.router.navigate([currentUrl]);
  //   }
  getPdf(){
    this.userService.getPdf().subscribe(
    (data)=>{
    console.log(data.message);
    }
    )
    }




  
}
