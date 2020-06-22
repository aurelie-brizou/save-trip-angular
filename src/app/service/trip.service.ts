import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Trip} from "../models/trip.model";
import * as firebase from "firebase";

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

  uploadFile(file: File) {
    return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
              .child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
              () => {
                console.log('Chargement…');
              },
              (error) => {
                console.log('Erreur de chargement ! : ' + error);
                reject();
              },
              () => {
                resolve(upload.snapshot.ref.getDownloadURL());
              }
          );
        }
    );
  }
}
