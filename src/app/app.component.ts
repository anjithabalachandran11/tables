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
  viewing=false
  searching=false
  searchresult:any
  count=0
  current=0
  name="Anju Jose"
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
    console.log(this.count)
    this.current=this.count
    for(let i=0;i<5;i++){
      if(this.current<this.data.length){
        this.details.push(this.data[this.current])
        this.current=this.current+1
      }
    }

    console.log('details: ',this.details)
  }
  display(){
    this.http.get('http://localhost:3000/display').subscribe((result)=>{
    this.data=result
    //console.log("data: ",data)
    this.page()
    this.viewing=true
    this.searching=false
    })
  }
  search(){
    this.http.get('http://localhost:3000/display').subscribe((result)=>{
    this.data=result
    this.viewing=false
    for(let i of this.data){
      if(this.searchname.toUpperCase()==i.emp_name){
        this.searchresult=i;
        this.searching=true
      }
    }
    })

  }
  searchfun(name:any){
    console.log(name)
    const data = {
      name
    }
    this.http.get('http://localhost:3000/search',name).subscribe((data)=>{
    this.details=data
    })
  }
}
