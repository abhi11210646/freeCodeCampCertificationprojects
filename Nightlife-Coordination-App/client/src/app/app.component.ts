import { Component, OnInit } from '@angular/core';
import { MapService } from './service/nlmapsearch.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  response:any[] = [];
  location:string = ''; type:string ='restaurant';
  loading: Boolean = false;
  constructor(private _MapService: MapService) {}
  ngOnInit() {
    //
  }
  getResults() {
    this.loading = true;
    this._MapService.getData(this.location, this.type).subscribe((response)=>{
     this.response = response;
      this.loading = false;
    },(err)=>{
      console.log('error', err);
    });
  }
  typeSearch(stype:string){
    this.type = stype;
    if(this.location)
      this.getResults();
  }
  Go() {
     this.getResults();
  }
}
