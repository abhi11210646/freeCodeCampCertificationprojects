import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class MapService {
    url:string = '';
    constructor(private _http : Http) {
        this.url = environment.API;
    }
    getData(location:string, type:string):Observable<any> {
         return this._http.post(this.url, {location: location, type:type}).map((response: Response)=>{
             return response.json();
         }).catch((err)=>{return Observable.throw(err.json());})
    }
    updateGoingStatus(placeId): Observable<any> {
         return this._http.post(this.url+'/updateGoing', {placeId: placeId}, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }), method: 'post' }) )
         .map((response: Response)=>{
             return response.json();
         }).catch((err)=>{return Observable.throw(err.json());})
    }
    login(data:Object) {
         return this._http.post(this.url+'/login', data).map((response: Response)=>{
             return response.json();
         }).catch((err)=>{return Observable.throw(err.json())});
    }
    signUp(data:Object) {
         return this._http.post(this.url+'/signUp', data).map((response: Response)=>{
             return response.json();
         }).catch((err)=>{return Observable.throw(err.json()); });
    }
}