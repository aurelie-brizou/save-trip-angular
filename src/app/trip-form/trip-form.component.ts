import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripService } from '../service/trip.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {

  selectedFile = null;
  isUploded = null;
  imageFormEmpty = null;

  tripForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
    itinerary: new FormControl(),
    description: new FormControl()
  });

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
    this.tService.uploadFile(this.selectedFile)
        .then(
            (url: string) => {
              this.fileUrl = url;
            }
        );
    this.isUploded = true;


  }


  ngOnInit() {
    this.getTypes();
  }


  getTypes(){
    this.typesForm$ = (this._httpClient.get('./assets/json/types.json') as Observable<Object[]>);
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.tripForm.invalid && !this.isUploded) {
      this.imageFormEmpty = true;
      return false;
    } else {
      let newTrip = this.tripForm.value;
      console.log(newTrip);
      if(this.fileUrl && this.fileUrl !== '') {
        newTrip.photo = this.fileUrl;
      }
      this.tService.createTrip(newTrip)
          .then((res:firebase.firestore.DocumentReference) => {
            // this.resetFields();
            this.router.navigate(['/trips']);
          })
          .catch((error : Error) => {
            console.error(error);
          })
    }
  }

  /*resetFields() {
    throw new Error("Method not implemented.");
  }*/
  
}
