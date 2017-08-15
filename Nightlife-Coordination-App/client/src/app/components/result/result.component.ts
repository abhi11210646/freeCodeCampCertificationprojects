import { Component,Input, OnInit } from '@angular/core';
import { MapService } from './../../service/nlmapsearch.service';
import { cookieService } from './../../service/cookie.service';
declare var jQuery:any;
@Component({
    selector: 'result',
    templateUrl: './result.template.html',
    styles: ['.img-size{ width: 250px; height: 250px}']
})

export class SearchResultComponent implements OnInit {
    @Input() data: any;
    user:string;
     constructor(private _MapService: MapService, private _cookieService:cookieService) {}
    ngOnInit() {
        this.user = this._cookieService.getCookie('token');
    }
    YouGoing(response) {
        if(this.user=='') {
            jQuery('#login').modal('show');
            return;
        }
     this._MapService.updateGoingStatus(response.placeId).subscribe((result)=>{
           this.data.goingCount++;
             console.log('updated'); 
        },(err)=>{
          console.log('error', err);
        });
  }
}