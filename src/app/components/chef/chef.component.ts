import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
//etape 2 déclaration de la variable @input
@Input() childChef : any;
@Output() newChefs =new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
delete(id:any){
  let allChefs =JSON.parse(localStorage.getItem("users")||"[]");
  let pos;
  for (let i = 0; i < allChefs.length; i++) {
if (allChefs[i].id = id) {
pos =i;  
}    
  }
  allChefs.splice(pos,1);
  localStorage.setItem("users",JSON.stringify(allChefs));
  this.newChefs.emit(allChefs);
}
}
