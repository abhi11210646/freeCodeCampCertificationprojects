import { Injectable } from '@angular/core';

@Injectable()
export class cookieService {
    constructor(){}
    
    getCookie(name:string) {
        let cookie: Array<string> = document.cookie.split(';');
        let cookieLen: number = cookie.length;
        let cookieName = `${name}=`;
        let c: string;
        
        for (let i: number = 0; i < cookieLen; i += 1) {
            c = cookie[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }
    setCookie(name:string, value:string, expireDays:number, path:string = '') {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
    }
    
    deleteCookie(name:string) {
        this.setCookie(name,'',-1);
    }
    
}