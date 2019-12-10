import { Component, OnInit } from '@angular/core';
import { Trip } from '../../shared/trip';
import { TripService } from '../service/trip.service';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips:Trip[];

  constructor(private tService:TripService) { }
 
  ngOnInit( ) {
    this.tService.getTrips().subscribe(data => {
      console.log('dataSub' + data);
      this.trips = data.map(t => {
        console.log(t.payload.doc.data())
        return {
          ...t.payload.doc.data()
        } as Trip;        
      })
    });
  }

  getColorTrip(type) {
    switch (type) {
      case 'A vélo':
        return 'green';
      case 'Road trip en voiture':
        return 'red';
      case 'Trek':
        return 'blue';
      case 'Séjour':
        return 'black';
      case 'Backpacker':
        return 'pink';
    }
  }

  getIconTrip(type) {
    const path = 'assets/image/';
    switch (type) {
      case 'A vélo':
        return path + 'bike.svg';
      case 'Road trip en voiture':
         return path + 'travel-car.svg';
      case 'Trek':
         return path + 'trek.svg';
      // case 'Séjour':
      //   return 'black';
      // case 'Backpacker':
      //   return 'pink';
    }
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  /*dataState() {     
    this.tService.getTrips().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }*/
}
