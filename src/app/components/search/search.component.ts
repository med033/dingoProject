import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  chef : any={};
  chefs : any={};
  isDisplay:any=false;
searchForm: FormGroup;

  constructor(private fb :FormBuilder, private userservice : UserService) { }

  ngOnInit() {
    this.searchForm =this.fb.group({
      searchValue : ['']
    }) 
  }

search(){

  this.userservice.searchChef(this.chef).subscribe(
    (data)=> {
      console.log(data.chefs);
      this.isDisplay=! this.isDisplay ;
      this.chefs = data.chefs
      
    }
  )
}



}
