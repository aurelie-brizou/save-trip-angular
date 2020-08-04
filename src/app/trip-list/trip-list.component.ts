import { Component, OnInit } from '@angular/core';
import { Trip } from '../../shared/trip';
import { TripService } from '../service/trip.service';
import {take} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

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
        return '#ff8e06';
      case 'Backpacker':
        return 'Black';
    }
  }

  getIconTrip(type) {
    let path = '../assets/image/';
    let nameIcon = '';
    switch (type) {
      case 'A vélo':
        path = path + 'bike.svg';
        nameIcon = 'bike';
        break;
      case 'Road trip en voiture':
        path = path + 'travel-car.svg';
        nameIcon = 'travel';
        break;
      case 'Trek':
        path = path + 'trek.svg';
        nameIcon = 'trek';
        break;
      case 'Backpacker':
        path = path + 'backpacker.svg';
        nameIcon = 'backpacker';
        break;
      case 'Séjour':
        path = path + 'sejour.svg';
        nameIcon = 'sejour';
        break;
    }
    this.matIconRegistry.addSvgIcon(
        nameIcon,
        this.domSanitzer.bypassSecurityTrustResourceUrl(path)
    );

    return nameIcon;

  }

}
