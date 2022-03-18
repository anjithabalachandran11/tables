import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table';
  formdata=new FormGroup({
    name : new FormControl({})
  })
  
  constructor(private http:HttpClient) { }


  details:any
  searchname:any
  display(){
    this.http.get('http://localhost:3000/display').subscribe((data)=>{
    this.details=data
    console.log("data: ",data)
    })
  }
  search(name:any){
    const data = {
      name
    }
    this.http.post('http://localhost:3000/search',data).subscribe((data)=>{
    this.details=data
    })
  }
}
