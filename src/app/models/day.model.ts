import { Place } from './place.model';

export class Day {
    constructor(public date:Date, 
                public favoriteVisits:Place,
                public favoriteRestaurant:Place,
                public favoriteAccommodation:Place, 
                public note:String) {}
}
