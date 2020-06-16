import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Trip} from "../models/trip.model";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private _firestore: AngularFirestore) { }

  getTrips() {
    // snapshotChanges with metadata
    return this._firestore.collection('trips').snapshotChanges();
  }


  getTripById(tripId:string): Observable<Trip>{
    // valueChanges only data
    return this._firestore.doc<Trip>('trips/' + tripId).valueChanges();

  }

  createTrip(trip:Trip) {
    return this._firestore.collection('trips').add(trip);
  }

  /*
  updateTrip(trip:Trip) {
    delete trip.id;
    this._firestore.doc('trips/' + trip.id).update(trip);
  }

  deleteTrip(tripId:string) {
    this._firestore.doc('trips/' + tripId).delete();
  }*/
}
