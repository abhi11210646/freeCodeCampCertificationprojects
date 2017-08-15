import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MapService } from './service/nlmapsearch.service'
import { cookieService } from './service/cookie.service'
import { AppComponent } from './app.component';
import { SearchResultComponent } from './components/result/result.component';
import { loginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,SearchResultComponent,loginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [MapService,cookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
