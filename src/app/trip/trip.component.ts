import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from '../service/trip.service';
import { Observable } from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {Trip} from "../models/trip.model";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  trip$: Observable<Trip>;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _service: TripService,
    private _db: AngularFirestore) {
  }


  ngOnInit() {
    const id = this._route.snapshot.paramMap.get("id");
    //console.log("id : " + this.route.snapshot.paramMap.get("id"));
    this.trip$ = this._service.getTripById(id);
  };

  onBack() {
    this._router.navigate(['/trips']);
  }
}
