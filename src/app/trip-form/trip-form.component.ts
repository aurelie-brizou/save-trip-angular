import { Component, OnInit, HostListener, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripService } from '../service/trip.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {

  selectedFile = null;
  isUploded:boolean;

  tripForm:FormGroup;
  typesForm$: Observable<Object[]>;
  fileUrl: string;

  constructor(
    private tService:TripService,
    private router:Router,
    private _httpClient:HttpClient,
    private formBuilder: FormBuilder,
    private _storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }


  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.isUploded = false;

  }

  onUpUpload(){
    if(this.selectedFile !== null){
      this.tService.uploadFile(this.selectedFile)
          .then(
          (url: string) => {
            this.fileUrl = url;
          }
      );
      this.isUploded = true;
    }
  }

  ngOnInit() {
    this.getTypes();
    this.initForm();
  }

  initForm() {
    this.tripForm = this.formBuilder.group( {
      name: ['', Validators.required],
      type: ['', Validators.required],
      photo: '',
      itinerary: '',
      description: ''
    });
  }



  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


  getTypes(){
    this.typesForm$ = (this._httpClient.get('./assets/json/types.json') as Observable<Object[]>);
  }



  onSubmit(value){
    console.log(value);
    if(this.fileUrl && this.fileUrl !== '') {
      value.photo = this.fileUrl;
    }
    this.tService.createTrip(value)
    .then((res:firebase.firestore.DocumentReference) => {
        // this.resetFields();
        this.router.navigate(['/trips']);
      })
    .catch((error : Error) => {
      console.error(error);
    })
  }



  /*resetFields() {
    throw new Error("Method not implemented.");
  }*/
  
}
