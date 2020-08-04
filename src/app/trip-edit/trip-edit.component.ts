import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";
import {TripService} from "../service/trip.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})

export class TripEditComponent implements OnInit {

  currentType;
  id:string;
  tripEditForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    file: new FormControl(''),
    itinerary: new FormControl(),
    description: new FormControl()
  });


  selectedFile = null;
  isUploded = null;
  imageFormEmpty = null;

  typesForm$: Observable<Object[]>;
  fileUrl: string;

  constructor(private _tService: TripService, private _route: ActivatedRoute, private _formBuilder: FormBuilder, private _router:Router, private _httpClient:HttpClient) { }

  ngOnInit(){
    this.id = this._route.snapshot.paramMap.get("id");
      this.getTypes();
      this._tService.getTripById(this.id).subscribe(trip => {
        this.tripEditForm.patchValue(trip);
        console.log(trip);
        this.currentType = "trek";
    });
  };

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.isUploded = false;
    this._tService.uploadFile(this.selectedFile)
        .then(
            (url: string) => {
              this.fileUrl = url;
            }
        );
    this.isUploded = true;


  }

  getTypes(){
    this.typesForm$ = (this._httpClient.get('./assets/json/types.json') as Observable<Object[]>);
  }

  get name(){
    return this.tripEditForm.get('name');
  }
  get type(){
    return this.tripEditForm.get('type');
  }
  get photo(){
    return this.tripEditForm.get('photo');
  }
  get intinerary(){
    return this.tripEditForm.get('itinerary');
  }
  get description(){
    return this.tripEditForm.get('description');
  }

  updateForm() {
      // stop here if form is invalid
      if (this.tripEditForm.invalid) {
        this.imageFormEmpty = true;
        return false;
      } else {
        console.log(this.tripEditForm.value);
        this._tService.updateTrip(this.tripEditForm.value, this.id);
        this._router.navigate(['/trips']);
      }
  }

  onBack() {
    this._router.navigate(['/trips']);
  }
}
