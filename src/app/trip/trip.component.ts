import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TripService } from '../service/trip.service';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  trip: Trip;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: TripService) { }

  ngOnInit() {}
}
