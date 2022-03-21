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
  constructor(private http:HttpClient) { }

  details:any
  data:any
  searchname:any
  filteroption:any
  viewing=false
  searching=false
  searchresult:any
  count=0
  current=0

  previous(){
    if(this.count<=0){
      this.count=0
      this.page()
    }
    else{
    this.count=this.count-5
    this.page()
    }
    
  }
  next(){
    if(this.count<this.data.length && this.current!=this.data.length){
      this.count=this.count+5
      this.page()
    }
  }
  page(){
    this.details=new Array()
    this.current=this.count
    for(let i=0;i<5;i++){
      if(this.current<this.data.length){
        this.details.push(this.data[this.current])
        this.current=this.current+1
      }
    }
  }
  display(){
    this.http.get('http://localhost:3000/display').subscribe((result)=>{
    this.data=result
    this.page()
    this.viewing=true
    this.searching=false
    })
  }
  searchfun(name:any){
    const data={
      name
    }
    this.http.post('http://localhost:3000/search',data).subscribe((data)=>{
      this.searchresult=data
      this.viewing=false
      this.searching=true
    })
  }
  sortfun(option:any){
    const data={
      option
    }
    this.http.post("http://localhost:3000/sort",data).subscribe((result)=>{
      this.data=result
      this.page()
      this.viewing=true
      this.searching=false
    })
  }
  displayfun(){

  }
}
