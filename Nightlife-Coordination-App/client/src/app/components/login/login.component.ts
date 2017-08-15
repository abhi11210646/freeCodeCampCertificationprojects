import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from './../../service/nlmapsearch.service';
import { cookieService } from './../../service/cookie.service';
declare var jQuery:any;
@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class loginComponent implements OnInit{
    public loginForm: FormGroup;
    public signUpForm: FormGroup;
    public logginError:string ='';
    public signupError:string ='';
    constructor(private _fb:FormBuilder, 
    private _MapService:MapService,
    private _cookieService:cookieService) {}
    ngOnInit() {
        this.loginForm = this._fb.group({
            'email': new FormControl('',[Validators.required]),
            'password': new FormControl('',[Validators.required])
        });
        this.signUpForm = this._fb.group({
           'name':new FormControl('',[Validators.required]),
           'email':new FormControl('',[Validators.required]),
           'password':new FormControl('',[Validators.required])
        });
    }
    login(event:any) {
        this.logginError  ='';
        event.preventDefault();
        this._MapService.login(this.loginForm.value).subscribe(
            (response)=>{
                let token = JSON.stringify(response);
                this._cookieService.setCookie('token', token, 2);
                localStorage.setItem('user',token);
                jQuery('#login').modal('hide');
            },
            (error)=>{
                this.logginError = error.message;
            }
        );
        
    }
    signUp(event:any) {
        this.signupError ='';
        event.preventDefault();
        this._MapService.signUp(this.signUpForm.value).subscribe(
            (response)=>{
                 let token = JSON.stringify(response);
                this._cookieService.setCookie('token', token, 2);
                this.signupError = 'Successfully Registered please login to continue';
            },
            (error)=>{
                this.signupError = error.message;
            }
        );
    }
}