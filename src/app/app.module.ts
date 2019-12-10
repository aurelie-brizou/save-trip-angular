import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripComponent } from './trip/trip.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripService } from './service/trip.service';
import { DropzoneDirective } from './dropzone.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripListComponent,
    TripComponent,
    TripFormComponent,
    PageNotFoundComponent,
    DropzoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    HttpClientModule, 
    AngularSvgIconModule
  ],
  providers: [TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
