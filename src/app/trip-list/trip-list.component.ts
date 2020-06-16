import { Component, OnInit } from '@angular/core';
import { Trip } from '../../shared/trip';
import { TripService } from '../service/trip.service';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips:Trip[];

  constructor(private tService:TripService) { }

  ngOnInit( ) {
    // this.tService.getTrips().pipe(take(1)).subscribe(data => {
    this.tService.getTrips().subscribe(data => {
      this.trips = data.map(trip => {
        return {
          id: trip.payload.doc.id,
          ...trip.payload.doc.data() as Trip
        }
      });
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
        return 'Black';
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
      case 'Backpacker':
        return path + 'backpacker.svg';
    }
  }

}
