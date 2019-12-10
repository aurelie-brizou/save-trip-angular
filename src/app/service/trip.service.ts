import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Trip } from 'src/shared/trip';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  tripsCollection: AngularFirestoreCollection<Trip>;
  trips$: Observable<Trip[]>;

  
  trips: Trip[] = [];

  constructor(private firestore: AngularFirestore) { }

  getTrips() {
    return this.firestore.collection('trips').snapshotChanges();
  }

  getTripById(tripId:string) {
    return this.firestore.doc('trips/' + tripId).snapshotChanges();
  }

  createTrip(trip:Trip) {
    return this.firestore.collection('trips').add(trip);
  }

  updateTrip(trip:Trip) {
    delete trip.id;
    this.firestore.doc('trips/' + trip.id).update(trip);
  }

  deleteTrip(tripId:string) {
    this.firestore.doc('trips/' + tripId).delete();
  }
}
