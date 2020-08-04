import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {AngularSvgIconModule} from "angular-svg-icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TripListComponent,
    TripComponent,
    TripFormComponent,
    PageNotFoundComponent,
    TripEditComponent
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
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    AngularSvgIconModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatInputModule
  ],
  providers: [TripService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
