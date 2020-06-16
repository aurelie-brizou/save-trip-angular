import { stringify } from '@angular/compiler/src/util';

export class Trip {
    constructor(
        public name:string,
        public photo:string,
        public description:string,
        public itenerary:string,
        public type:string[] ) {}
}
